import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP_OPTIONS } from 'src/app/shared/http_options';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private _usuarios = [];
  private _history = [];

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
  
  constructor(private http: HttpClient) { }

  getAllUsuarios(pageNumber: number, limit: number){
    const body = `{
        users(pageNumber: ${pageNumber}, limit: ${limit}) {
          CustomerName,
          Credits
        }
    }`;
    
    return this.http.post<any>(environment.graphQL, body, HTTP_OPTIONS);
  }
  getUserHistory(userEmail: string) {
    const body = `{
      user(CustomerEmail: "${userEmail}") {
        CustomerEmail
        LinksDownload {
          ItemTitle,
          orderDate
        }
      }
    }`;

    return this.http.post<any>(environment.graphQL, body, HTTP_OPTIONS);
  }


}
