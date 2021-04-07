import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HTTP_OPTIONS } from 'src/app/shared/http_options';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private _history = [];
  private _usuarios = [];
  
  constructor(private http: HttpClient) { }

  get usuarios() {
    return this._usuarios;
  }
  set usuarios(usuarios) {
    this._usuarios = usuarios;
  }

  get history() {
    return this._history;
  }
  set history(history) {
    this._history = history;
  }

  getAllUsuarios(pageNumber: number, limit: number){
    const body = `{
        users(pageNumber: ${pageNumber}, limit: ${limit}) {
          previousPage,
          nextPage,
          totalItems,
          data {
              CustomerName,
              Credits,
              CustomerEmail
          }
        }
    }`;
    
    return this.http.post<any>(environment.graphQL, body, HTTP_OPTIONS);
  }

  getUserHistory(userEmail: string) {
    const body = `{
      user(CustomerEmail: "${userEmail}") {
        CustomerEmail CustomerID CustomerName Credits
        LinksDownload {
          LinkID, ItemTitle, OrderDate
        }
      }
    }`;

    return this.http.post<any>(environment.graphQL, body, HTTP_OPTIONS);
  }

  deletePluginFromHistory(linkId: number) {
    return this.http.delete(`${environment.backendURL}/users/plugins/${linkId}`);
  }
}
