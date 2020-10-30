import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditosComponent } from './creditos.component';
import { CreditosRoutingModule } from './creditos-routing.module';


@NgModule({
  declarations: [
    CreditosComponent
  ],
  imports: [
    CommonModule,
    CreditosRoutingModule
  ]
})
export class CreditosModule { }
