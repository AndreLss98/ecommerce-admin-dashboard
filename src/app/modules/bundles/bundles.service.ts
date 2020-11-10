import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BundlesService {

  private _mockBundles = [
    {
      ItemTitle: 'Glitch',
      Plugins: [
        { ItemTitle: 'Motion Typography' },
        { ItemTitle: 'Freeze Frame' }
      ]
    },
    {
      ItemTitle: 'BulletPoints',
      Plugins: [
        { ItemTitle: 'Maps' },
        { ItemTitle: 'Grids' },
        { ItemTitle: 'Motion Typography' },
        { ItemTitle: 'Freeze Frame' }
      ]
    },
    {
      ItemTitle: 'Motion Graphics',
      Plugins: [
        { ItemTitle: 'CyberPunk' },
        { ItemTitle: 'Smart Titles' },
        { ItemTitle: 'Mockups' },
        { ItemTitle: 'Maps' },
        { ItemTitle: 'Grids' },
        { ItemTitle: 'Motion Typography' },
        { ItemTitle: 'Freeze Frame' }
      ]
    }
  ];

  get bundles() {
    return this._mockBundles;
  }

  constructor() { }

  public getAll() {
    return of(this.bundles);    
  }
}
