import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PluginsService {

  constructor(private http: HttpClient) { }

  public uploadFile(productId, file: File) {
    const form = new FormData();
    form.append('file', file);
    
    return this.http.post(`${environment.backendURL}/products/upload-file/${productId}`, form);
  }

  public getPluginMetafields(id: number) {
    const params = new HttpParams().append('id', id.toString());
    return this.http.get<any>(`${environment.backendURL}/products/metafields`, { withCredentials: true, params, observe: 'response' });
  }
}
