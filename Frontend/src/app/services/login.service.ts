import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // onLogin(obj: any ): Observable<any>{
  //     return this.http.post('http://127.0.0.1:8080/user/login', obj);
  // }

  // login(Email: string, Password: string) {
  //   const loginData = { Email, Password };
  //   return this.http.post(`http://localhost/auth/user/login`, loginData);
  // }
  login(obj: any) : Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/user/login`, obj);
  }
}
