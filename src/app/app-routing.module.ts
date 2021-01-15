import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/guards/auth-guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "creditos",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: () => import("./modules/login/login.module").then(m => m.LoginModule)
  },
  {
    path: "home",
    loadChildren: () => import("./modules/home/home.module").then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: "creditos",
    loadChildren: () => import("./modules/creditos/creditos.module").then(m => m.CreditosModule),
    canActivate: [AuthGuard]
  },
  {
    path: "bundles",
    loadChildren: () => import("./modules/bundles/bundles.module").then(m => m.BundlesModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: "usuarios",
  //   loadChildren: () => import("./modules/usuarios/usuarios.module").then(m => m.UsuariosModule),
  //   canActivate: [AuthGuard]
  // },
  {
    path: "plugins",
    loadChildren: () => import("./modules/plugins/plugins.module").then(m => m.PluginsModule),
    canActivate: [AuthGuard]
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
