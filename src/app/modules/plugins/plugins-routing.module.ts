import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PluginsComponent } from './plugins.component';

import { PluginsGraphqlResolver } from './plugins-graphql-resolver';
import { CollectionsResolver } from 'src/app/shared/resolvers/collections.resolver';

const routes: Routes = [
  {
    path: '',
    component: PluginsComponent,
    resolve: {
      plugins: PluginsGraphqlResolver,
      categorias: CollectionsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PluginsRoutingModule { }
