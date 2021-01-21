import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BundlesService } from 'src/app/modules/bundles/bundles.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionsResolver implements Resolve<any> {

  constructor(private bundleService: BundlesService) { }

  resolve() {
    return this.bundleService.getCollections();
  }
}
