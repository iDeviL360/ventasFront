import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  api:string = environment.apiUrl;
  private headers = new HttpHeaders({
    ['x-access-token']: this.usuarioService.userToken
  }); 

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService) { }


  obtenerProductos() {
    return this.http.get(`${this.api}/api/productos/`, { headers: this.headers });
  }
  
}
