import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { UsuariosService } from './usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosResolver implements Resolve<any> {
  
  constructor(
    private usuariosService : UsuariosService
  ) { }

  resolve(route: ActivatedRouteSnapshot){
    return this.usuariosService.getUserHistory(route.paramMap.get('email'));
  }
}
