import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { BundlesService } from '../bundles/bundles.service';

@Injectable({
  providedIn: 'root'
})
export class PluginsResolver implements Resolve<any> {

  constructor(
    private bundleService: BundlesService
  ) { }

  resolve() {
    return this.bundleService.getAllPlugins();
  }
}
