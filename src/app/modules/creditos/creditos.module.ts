import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CreditosComponent } from './creditos.component';
import { CreditosRoutingModule } from './creditos-routing.module';


@NgModule({
  declarations: [
    CreditosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    CreditosRoutingModule,
    MatProgressSpinnerModule,
  ]
})
export class CreditosModule { }
