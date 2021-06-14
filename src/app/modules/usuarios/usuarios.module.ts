import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
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

import { UsuariosComponent } from './usuarios.component';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    UsuariosComponent,
    UsuariosFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    UsuariosRoutingModule,
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
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
  ]
})
export class UsuariosModule { }
