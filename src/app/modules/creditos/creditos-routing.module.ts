import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditosComponent } from './creditos.component';
import { PluginsResolver } from './plugins-resolver';

const routes: Routes = [
  {
    path: '',
    component: CreditosComponent,
    resolve: {
      plugins: PluginsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditosRoutingModule { }
