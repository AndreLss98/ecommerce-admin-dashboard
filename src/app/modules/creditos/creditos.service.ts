import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { HTTP_OPTIONS } from 'src/app/shared/http_options';

@Injectable({
  providedIn: 'root'
})
export class CreditosService {

  constructor(private http: HttpClient) {

  }

  getUserCreditsUsed(userEmail: string) {
    const body = `{
      user(CustomerEmail: "${userEmail}") {
        CustomerName
        CustomerEmail
        Credits
        CreditosUsados {
          ItemTitle,
          CreditsUsed
        }
      }
    }`;

    return this.http.post<any>(environment.graphQL, body, HTTP_OPTIONS);
  }
}
