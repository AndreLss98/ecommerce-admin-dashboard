import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreditosService {

  constructor(private http: HttpClient) {

  }

  getUserCreditsUsed(userEmail: string) {

  }
}
