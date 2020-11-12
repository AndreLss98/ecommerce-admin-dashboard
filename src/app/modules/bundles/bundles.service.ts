import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    private http: HttpClient
  ) { }

  public getAllBundles() {
    return this.http.get<any>('https://lenofx.com/collections/promotional-packs/products.json')
      .pipe(shareReplay(1));
  }

  public getAllPlugins() {
    return of(this.plugins);
  }

  public getBundleById(handle) {
    return of(this.bundles.find(el => el.handle == handle));
  }

  public getProductsOfBundle(bundleID) {
    return this.http.get<any>(`${environment.backendURL}/products/bundle-products/${bundleID}`);
  }
}
