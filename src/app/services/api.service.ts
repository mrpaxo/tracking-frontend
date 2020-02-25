import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , throwError, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Credentials } from '../models/credentials.class';
import { Url } from '../models/url.model'
import { Articulo } from '../models/articulo.class';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public credentials:Credentials;
  private apiServer = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient) {
  
    
    
  }
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private getHeaders(){
    this.credentials = Credentials.loadFromCookie('tracking-session');
    return {'Content-Type':'application/json','Authorization':'token '+this.credentials.access_token}
  }
 
  public getUrlUser(): Observable<Url[]> {
    return this.http.get<Url[]>(this.apiServer + 'url/url-app/',{headers:this.getHeaders()})
    .pipe(
      catchError(this.errorHandler)
    )
  }
  public createUrl(product:any): Observable<Url> {
    return this.http.post<Url>(this.apiServer + 'url/url-app/', JSON.stringify(product), {headers:this.getHeaders()})
    .pipe(
      catchError(this.errorHandler)
    )
  }  
  public getArticulosUser(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiServer + `url/articulo-app/`,{headers:this.getHeaders()}).pipe(
      map(data => data.map(data => new Articulo().deserialize(data)))
    );
  }
  public getArticuloDetail(id:number): Observable<Articulo> {
    return this.http.get<Articulo>(this.apiServer + 'url/articulo-app/' + id+'/',{headers:this.getHeaders()}).pipe(
      map(data => new Articulo().deserialize(data)),
      catchError(this.errorHandler)
    )
  }
  public logout(): Observable<any> {
    
    return this.http.get(this.apiServer + 'users/logout', {headers:this.getHeaders()})
    .pipe(
      map(data =>{
        console.log(data);
        this.credentials.deleteCookie('tracking-session');
        this.loggedIn.next(false);
        window.location.reload();
      }),
      catchError(this.errorHandler)
    )
  }  
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
