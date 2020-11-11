import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BundlesComponent } from './bundles.component';
import { BundleFormComponent } from './bundle-form/bundle-form.component';
import { BundlesFormEditResolverService } from './bundles-form-edit-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: BundlesComponent
  },
  {
    path: 'new',
    component: BundleFormComponent
  },
  {
    path: 'edit/:id',
    component: BundleFormComponent,
    resolve: {
      bundle: BundlesFormEditResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BundlesRoutingModule { }
