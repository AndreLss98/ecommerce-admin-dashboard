import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BundlesRoutingModule } from './bundles-routing.module';

import { BundlesComponent } from './bundles.component';

@NgModule({
  declarations: [
    BundlesComponent
  ],
  imports: [
    CommonModule,
    BundlesRoutingModule
  ]
})
export class BundlesModule { }
