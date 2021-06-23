import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PluginsService {

  constructor(private http: HttpClient) { }

  public uploadFile(productId, file: File) {
    const form = new FormData();
    form.append('file', file);
    
    return this.http.post(`${environment.backendURL}/products/upload-file/${productId}`, form, { observe: "events", reportProgress: true} );
  }
}
