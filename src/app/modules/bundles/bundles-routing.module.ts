import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BundlesComponent } from './bundles.component';
import { BundleFormComponent } from './bundle-form/bundle-form.component';

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
    component: BundleFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BundlesRoutingModule { }
