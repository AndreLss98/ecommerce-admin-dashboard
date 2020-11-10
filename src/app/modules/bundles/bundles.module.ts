import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';

import { BundlesRoutingModule } from './bundles-routing.module';

import { BundlesComponent } from './bundles.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  declarations: [
    BundlesComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    ComponentsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    BundlesRoutingModule,
  ]
})
export class BundlesModule { }
