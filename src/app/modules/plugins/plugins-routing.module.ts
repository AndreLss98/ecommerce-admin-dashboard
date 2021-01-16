import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PluginsResolver } from '../creditos/plugins-resolver';

import { PluginsComponent } from './plugins.component';

const routes: Routes = [
  {
    path: '',
    component: PluginsComponent,
    resolve: {
      plugins: PluginsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PluginsRoutingModule { }
