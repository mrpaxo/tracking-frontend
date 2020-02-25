import { Injectable } from '@angular/core';
//import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
//import { Observable } from 'rxjs';
//import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /*canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log(next,state)
    return this.authService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        console.log(isLoggedIn,'*****************')
        if (!isLoggedIn) {
          this.router.navigate(['login']);
          return false;
        }
        return true;
      })
    );
  }*/
  canActivate(): boolean {
    if (!this.authService.isToken()) {
      console.log('NO entro auth')
      this.router.navigate(['login']);
      return false;
    }
    console.log('entro auth')
    return true;
  }
}