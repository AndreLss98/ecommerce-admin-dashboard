import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

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
    return this.http.get<any>('https://lenofx.com/collections/promotional-packs/products.json')
      .pipe(shareReplay(1));
  }

  public getAllPlugins() {
    const params = new HttpParams().append('limit', '500');
    return this.http.get<any>('https://lenofx.com/products.json', { params });
  }

  public getBundleById(handle) {
    return this.http.get<any>(`${environment.backendURL}/products/bundle/${handle}`);
  }

  public getProductsOfBundle(bundleID) {
    return this.http.get<any>(`${environment.backendURL}/products/bundle-products/${bundleID}`);
  }

  public saveBundle(bundle) {
    return this.http.post(`${environment.backendURL}/products/bundle`, bundle);
  }
}
