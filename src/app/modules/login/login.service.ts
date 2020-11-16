import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return this.http.post<any>(`${environment.backendURL}/auth/login`, user);
  }

  public signup(user) {
    return this.http.post<any>(`${environment.backendURL}/auth/signup`, user);
  }

  public logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
