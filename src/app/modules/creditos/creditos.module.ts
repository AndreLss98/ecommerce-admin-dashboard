import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CreditosComponent } from './creditos.component';
import { CreditosRoutingModule } from './creditos-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  declarations: [
    CreditosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatSortModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    ComponentsModule,
    MatDividerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    CreditosRoutingModule,
    MatAutocompleteModule,
  ]
})
export class CreditosModule { }
