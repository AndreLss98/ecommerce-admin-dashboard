import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { HTTP_OPTIONS } from 'src/app/shared/http_options';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private http: HttpClient) { }

  public getInfo(query: string) {
    return this.http.post<any>(`${environment.backendURL}/graphql`, query, HTTP_OPTIONS);
  }
}
