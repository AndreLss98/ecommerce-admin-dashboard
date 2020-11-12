import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BundlesService {

  private _mockBundles = [
    {
      ProductID: 1,
      ItemTitle: 'Glitch',
      Plugins: [
        { ProductID: 9, ItemTitle: 'Motion Typography' },
        { ProductID: 10, ItemTitle: 'Freeze Frame' }
      ]
    },
    {
      ProductID: 2,
      ItemTitle: 'BulletPoints',
      Plugins: [
        { ProductID: 7, ItemTitle: 'Maps' },
        { ProductID: 8, ItemTitle: 'Grids' },
        { ProductID: 9, ItemTitle: 'Motion Typography' },
        { ProductID: 10, ItemTitle: 'Freeze Frame' }
      ]
    },
    {
      ProductID: 3,
      ItemTitle: 'Motion Graphics',
      Plugins: [
        { ProductID: 4, ItemTitle: 'CyberPunk' },
        { ProductID: 5, ItemTitle: 'Smart Titles' },
        { ProductID: 6, ItemTitle: 'Mockups' },
        { ProductID: 7, ItemTitle: 'Maps' },
        { ProductID: 8, ItemTitle: 'Grids' },
        { ProductID: 9, ItemTitle: 'Motion Typography' },
        { ProductID: 10, ItemTitle: 'Freeze Frame' }
      ]
    }
  ];

  private _mockPlugins = [
    { ProductID: 4, ItemTitle: 'CyberPunk' },
    { ProductID: 5, ItemTitle: 'Smart Titles' },
    { ProductID: 6, ItemTitle: 'Mockups' },
    { ProductID: 7, ItemTitle: 'Maps' },
    { ProductID: 8, ItemTitle: 'Grids' },
    { ProductID: 9, ItemTitle: 'Motion Typography' },
    { ProductID: 10, ItemTitle: 'Freeze Frame' }
  ];

  get bundles() {
    return this._mockBundles;
  }

  get plugins() {
    return this._mockPlugins;
  }

  constructor(
    private http: HttpClient
  ) {

  }

  public getAllBundles() {
    return this.http.get<any>('https://lenofx.com/collections/promotional-packs/products.json');
  }

  public getAllPlugins() {
    return of(this.plugins);
  }

  public getBundleById(ProductID) {
    return of(this.bundles.find(el => el.ProductID == ProductID));
  }
}
