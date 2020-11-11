import { of } from 'rxjs';
import { Injectable } from '@angular/core';

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

  constructor() { }

  public getAllBundles() {
    return of(this.bundles);    
  }

  public getAllPlugins() {
    return of(this.plugins);
  }
}
