import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "creditos",
    pathMatch: "full"
  },
  {
    path: "home",
    loadChildren: () => import("./modules/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "creditos",
    loadChildren: () => import("./modules/creditos/creditos.module").then(m => m.CreditosModule)
  },
  {
    path: "bundles",
    loadChildren: () => import("./modules/bundles/bundles.module").then(m => m.BundlesModule)
  },
  {
    path: "usuarios",
    loadChildren: () => import("./modules/usuarios/usuarios.module").then(m => m.UsuariosModule)
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
