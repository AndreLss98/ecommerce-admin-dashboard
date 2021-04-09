import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios/usuarios.service';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosResolver implements Resolve<any> {
  
  constructor(
    private usuariosService : UsuariosService
  ) { }

  async resolve(route: ActivatedRouteSnapshot){
    const user = await this.usuariosService.getUserHistory(route.paramMap.get('email')).toPromise();
    if(user.data.user === null) {
      return null;
    }else {
      return user;
    }
  }
}
