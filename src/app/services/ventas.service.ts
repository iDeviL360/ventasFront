import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment.prod';
import { Venta } from '../models/venta.model';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VentasService {



  constructor(private http: HttpClient,
              private usuarioService: UsuarioService) {
  }  

  obtenerVentas() {
    return this.http.get(`${environment.apiUrl}/api/ventas`, { headers: new HttpHeaders({
      ['x-access-token']: this.usuarioService.userToken
    })});
  }

  obtenerVentaPorId(ventaid: any) {
    return this.http.get(`${environment.apiUrl}/api/ventas/${ventaid}`, { headers: new HttpHeaders({
      ['x-access-token']: this.usuarioService.userToken
    })});
  }

  guardarVenta(venta: Venta) {
    return this.http.post(`${environment.apiUrl}/api/ventas`, venta, { headers: new HttpHeaders({
      ['x-access-token']: this.usuarioService.userToken
    })});
  }
  
  borrarVenta(ventaid: number) {
    return this.http.delete(`${environment.apiUrl}/api/ventas/${ventaid}`, { headers: new HttpHeaders({
      ['x-access-token']: this.usuarioService.userToken
    })});
  }
  
  editarVenta(ventaid: number, venta: Venta, ventaItemsDel: number[]) {
    const ventaUpdate = {
      ...venta,
      ventaItemsDel
    }

    return this.http.put(`${environment.apiUrl}/api/ventas/${ventaid}`, ventaUpdate, { headers : new HttpHeaders({
      ['x-access-token']: this.usuarioService.userToken
    })})
  }

}
