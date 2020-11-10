import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BundlesRoutingModule } from './bundles-routing.module';

import { BundlesComponent } from './bundles.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  declarations: [
    BundlesComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    BundlesRoutingModule
  ]
})
export class BundlesModule { }
