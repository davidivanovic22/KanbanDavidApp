import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

// export interface IUserToken {
//   username?: string;
//   roles?: string[];
// }



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userToken: any;
  private token: any;

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer xxx',
  });

  constructor(private http: HttpClient, private router: Router) {
    try {
      this.token = localStorage.getItem('userToken');
      this.userToken = jwt_decode(this.token);
    } catch (e) {
      console.error(e);
      console.error('Not logged in.');
    }
  }


  login(username: string, password: string): void {
    this.http.post(`${environment.baseUrl}/login`, { username, password }, {
      responseType: 'text'
      , headers: this.httpHeaders
    }).subscribe(token => {
      console.log(token, 'Token');
      if (token) {
        this.userToken = jwt_decode(token);
        this.token = token;
        localStorage.setItem('userToken', token);
        this.router.navigate(['home']);
      }
    });
  }

  logout(): void {
    this.userToken = undefined;
    this.token = '';
    localStorage.removeItem('userToken');
    this.router.navigate(['']);
  }

  get userRoles(): string[] {
    return this.userToken.roles;
  }

  get userJwtToken(): string {
    return this.token;
  }
  get isLoggedIn(): boolean {
    return !!this.userJwtToken;
  }

  isAdmin(): boolean {
    return this.userRoles.includes('ROLE_ADMIN');
  }
  isDeveloper(): boolean {
    return this.userRoles.includes('ROLE_DEVELOPER');
  }
}
