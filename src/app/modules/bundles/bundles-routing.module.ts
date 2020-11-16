import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BundlesComponent } from './bundles.component';
import { BundleFormComponent } from './bundle-form/bundle-form.component';
import { BundlesFormEditResolver } from './bundles-form-edit-resolver';

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
    path: 'edit/:handle',
    component: BundleFormComponent,
    resolve: {
      bundle: BundlesFormEditResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BundlesRoutingModule { }
