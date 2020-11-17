import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  public login(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      })
    }

    return this.http.post<any>(`${environment.backendURL}/auth/login`, user, { ...httpOptions, withCredentials: true });
  }

  public signup(user) {
    return this.http.post<any>(`${environment.backendURL}/auth/signup`, user, { withCredentials: true });
  }

  public logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
