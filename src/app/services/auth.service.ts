import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable ,throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../models/credentials.class';
import { catchError , map} from 'rxjs/operators';

@Injectable()
export class AuthService {
  public credentials:Credentials;
  private apiServer = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient){
    //this.credentials = Credentials.loadFromCookie('tracking-session');
  }
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  private getHeaders(){
    this.credentials = Credentials.loadFromCookie('tracking-session');
    return {'Content-Type':'application/json','Authorization':'token '+this.credentials.access_token}
  }
  public isToken() {
  let cookie = Credentials._getCookie('tracking-session')
   if(cookie){
      console.log('Existe cookie');
      this.loggedIn.next(true);
      return true
    }else{
      console.log('NO Existe cookie');
      this.loggedIn.next(false);
      return false
    }
  
  }

  login(userData:any): Observable<any>{
    return this.http.post(this.apiServer + 'users/signin', userData)
  }
  /*logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }*/
  logout(): Observable<any> {
    
    return this.http.get(this.apiServer + 'users/logout', {headers:this.getHeaders()})
    .pipe(
      map(data =>{
        console.log(data);
        this.credentials.deleteCookie('tracking-session');
        this.loggedIn.next(false);
        //window.location.reload();
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