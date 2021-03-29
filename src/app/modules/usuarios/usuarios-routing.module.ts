import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosResolver } from '../usuarios.resolver';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';

import { UsuariosComponent } from './usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent
  },
  {
    path : 'edit/:email',
    component: UsuariosFormComponent,
    resolve: {
      usuario: UsuariosResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
