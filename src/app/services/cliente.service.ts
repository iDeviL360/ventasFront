import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

import { environment } from '../../environments/environment.prod';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url = environment.apiUrl;
  private headers = new HttpHeaders({
    ['x-access-token']: this.usuarioService.userToken
  });

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService) { }

  obtenerClientePorCedula( cedula: number ) {
    const endpoint = `${this.url}/api/clientes/${cedula}`
    return this.http.get(endpoint, { headers: this.headers });
  }

  guardarCliente(nuevoCliente: Cliente) {
    return this.http.post(`${environment.apiUrl}/api/clientes`, nuevoCliente, { headers: this.headers });
  }



}
