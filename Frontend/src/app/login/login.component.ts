import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginObj: any = {
    "Email":"",
    "Password":""
  }

  constructor(private loginservice : LoginService,
    private router : Router
  ){}
  
    onLogin(){
    this.loginservice.login(this.loginObj).subscribe((res: any) => {
      console.log('res', res);
      // Check if the token is present in the response
      if (res.access_token) {
        // Stringify the token object before storing it in localStorage
        localStorage.setItem('token', JSON.stringify(res.access_token));
        this.router.navigateByUrl('/Dashboard_All');
      } else {
        // Handle the case where the token is not present in the response
        console.error('Token not found in response:', res);
        // You may want to display an error message to the user
      }
    });
  }
  }
  


