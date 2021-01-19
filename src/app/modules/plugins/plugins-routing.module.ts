import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PluginsGraphqlResolver } from './plugins-graphql-resolver';

import { PluginsComponent } from './plugins.component';

const routes: Routes = [
  {
    path: '',
    component: PluginsComponent,
    resolve: {
      plugins: PluginsGraphqlResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PluginsRoutingModule { }
