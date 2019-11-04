import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { environment } from '../../environments/environment.prod';
import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  userToken: string;

  constructor(public http: HttpClient) { 
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.leerToken();
  }

  login(usuario: Usuario) {
    return this.http.post(`${environment.apiUrl}/api/usuarios/login`, usuario).pipe(
      map((res:any) => {
        this.guardarToken(res.token);
        return res;
      })
    );
  }

  registrarUsuario(usuario: Usuario) {
    return this.http.post(`${environment.apiUrl}/api/usuarios/registro`, usuario).pipe(
      map( (res: any) => {
        this.guardarToken(res.token);
        return res;
      })
    );        
  }

  leerToken(){
    if(localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  private guardarToken(token: string) {
    this.userToken = token;
    localStorage.setItem('token', token);

    let expiresIn = new Date();
    expiresIn.setSeconds(7200)

    localStorage.setItem('expiresIn', expiresIn.toString())
  }

  estaAutenticado() : boolean {
    if(this.userToken.length < 2) {
      return false;
    }

    const expira = Date.parse(localStorage.getItem('expiresIn'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    
    if(expiraDate > new Date()) {
      return true;
    } else {
      this.logout();
      return false;
    }
  }


}
