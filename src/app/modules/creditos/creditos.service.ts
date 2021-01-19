import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { HTTP_OPTIONS } from 'src/app/shared/http_options';

@Injectable({
  providedIn: 'root'
})
export class CreditosService {

  constructor(private http: HttpClient) { }

  getUserCreditsUsed(userEmail: string) {
    const body = `{
      user(CustomerEmail: "${userEmail}") {
        CustomerName
        CustomerEmail
        CustomerID
        Credits
        CreditosUsados {
          ItemTitle
          CreditsUsed
          UsageDate
        }
      }
    }`;

    return this.http.post<any>(environment.graphQL, body, HTTP_OPTIONS);
  }

  getAllInInterval(start, end, itemID?) {
    const body = `{
      credits(start: "${start}", end: "${end}" ${itemID? 'itemID: ' + itemID : '\r'}) {
        ItemTitle
        CreditsUsed
        UsageDate,
        Customer {
          CustomerEmail
        }
      }
    }`;

    return this.http.post<any>(environment.graphQL, body, HTTP_OPTIONS);
  }

  updateCredits(CustomerID, Credits) {
    return this.http.put<any>(`${environment.backendURL}/users/credits/${CustomerID}`, { Credits }, { withCredentials: true });
  }
}
