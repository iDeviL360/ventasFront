import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router: Router,
              public usuarioService: UsuarioService) { }
              
              
    canActivate() : boolean {
    if(this.usuarioService.estaAutenticado()) {
      return true;
    } else {
      this.router.navigateByUrl('login');
      Swal.fire({
        title: 'Bloqueado por el guard!',
        text: 'No tan rapido amiguito, iniciá sesión',
        type: 'error',
        showConfirmButton: true
      })
      return false;
    }
  }
  
}
