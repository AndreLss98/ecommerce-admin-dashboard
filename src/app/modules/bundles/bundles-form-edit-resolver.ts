import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { BundlesService } from './bundles.service';

@Injectable({
  providedIn: 'root'
})
export class BundlesFormEditResolver implements Resolve<any> {

  constructor(
    private bundleService: BundlesService
  ) { }
  
  resolve(route: ActivatedRouteSnapshot) {
    return this.bundleService.getBundleById(route.paramMap.get('handle'));
  }
}
