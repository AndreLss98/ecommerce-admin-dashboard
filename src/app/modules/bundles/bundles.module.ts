import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { BundlesRoutingModule } from './bundles-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

import { BundlesComponent } from './bundles.component';
import { BundleFormComponent } from './bundle-form/bundle-form.component';

@NgModule({
  declarations: [
    BundlesComponent,
    BundleFormComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatChipsModule,
    MatButtonModule,
    MatRippleModule,
    ComponentsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    BundlesRoutingModule,
    MatAutocompleteModule,
  ]
})
export class BundlesModule { }
