import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UsuariosService } from './usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosResolver implements Resolve<any> {
  
  constructor(
    private usuariosService : UsuariosService,
    private router: Router
  ) { }

  async resolve(route: ActivatedRouteSnapshot){
    const user = await this.usuariosService.getUserHistory(route.paramMap.get('email')).toPromise();
    if(user.data.user === null){
      this.router.navigate(['/usuarios']);
      return ;
    }else{
      return user;
    }
  }
}
