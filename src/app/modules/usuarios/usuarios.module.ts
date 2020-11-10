import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosComponent } from './usuarios.component';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';


@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    UsuariosRoutingModule,
  ]
})
export class UsuariosModule { }
