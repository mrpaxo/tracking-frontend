import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Credentials } from '../models/credentials.class';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router : Router) { }

  public credentials: Credentials;
  form:any;
  error: string;

  ngOnInit() {
    this.form = {username : '',password : ''}
   }
   login(){
    
    this.authService.login(this.form).subscribe(
      (res: any) => {
        this.credentials = new Credentials(res);
        this.credentials.saveToCookie('tracking-session');
        this.router.navigate(["url"]);
      },
      (err: any) => {
        
        this.error = err.status == 401 ? 'unauthorized' : 'other';
        console.log(err);
      },
    );
  }
}
