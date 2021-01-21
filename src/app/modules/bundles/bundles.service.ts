import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BundlesService {

  private _bundles = [];

  private _plugins = [];

  get bundles() {
    return this._bundles;
  }

  set bundles(bundles) {
    this._bundles = bundles;
  }

  get plugins() {
    return this._plugins;
  }

  set plugins(plugins) {
    this._plugins = plugins;
  }

  constructor(
    private http: HttpClient
  ) { }

  public getAllBundles() {
    const params = new HttpParams().append('limit', '500');
    return this.http.get<any>('https://lenofx.com/collections/promotional-packs/products.json', { params })
      .pipe(shareReplay(1));
  }

  public getAllPlugins() {
    const params = new HttpParams().append('limit', '500');
    return this.http.get<any>('https://lenofx.com/products.json', { params });
  }

  public getPluginShopifyDetails(handle) {
    return this.http.get<any>(`https://lenofx.com/products/${handle}.json`, { observe: 'response' });
  }

  public getPluginMetafields(id) {
    const params = new HttpParams().append('id', id.toString());
    return this.http.get<any>(`${environment.backendURL}/products/metafields`, { withCredentials: true, params, observe: 'response' });
  }

  public getCollections() {
    return this.http.get<any>(`https://lenofx.com/collections.json`);
  }

  public savePluginLogMetafield(id, metas) {
    delete metas.id;
    return this.http.post<any>(`${environment.backendURL}/products/metafields/${id}`, metas, { withCredentials: true });
  }

  public getBundleById(handle) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      })
    }
    return this.http.get<any>(`${environment.backendURL}/products/bundle/${handle}`, { ...httpOptions, withCredentials: true });
  }

  public getProductsOfBundle(bundleID) {
    return this.http.get<any>(`${environment.backendURL}/products/bundle-products/${bundleID}`, { withCredentials: true });
  }

  public saveBundle(bundle) {
    return this.http.post(`${environment.backendURL}/products/bundle`, bundle, { withCredentials: true });
  }
}
