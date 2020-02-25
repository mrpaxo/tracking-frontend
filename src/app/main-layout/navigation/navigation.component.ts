import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: ElementRef;

  clicked: boolean;
  isLoggedIn$: Observable<boolean>;
  error: string;

  constructor(private authService: AuthService , private router: Router) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
  

  setClicked(val: boolean): void {
    this.clicked = val;
  }
  /*onLogout() {
    this.authService.logout();
  }*/
  onLogout(){
    
    this.authService.logout().subscribe(
      (res: any) => {
        console.log(res)
        this.router.navigate(['login']);
      },
      (err: any) => {
        
        this.error = err.status == 401 ? 'unauthorized' : 'other';
        console.log(err);
      },
    );
  }


}
