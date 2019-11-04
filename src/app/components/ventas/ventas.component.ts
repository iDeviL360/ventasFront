import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { VentasService } from 'src/app/services/ventas.service';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styles: []
})
export class VentasComponent implements OnInit {

  public ventas: any[];
  public listaDatos: MatTableDataSource<any>;
  public columnas: string[] = ['ventaid', 'nombre', 'cedula', 'total', 'fecha', 'acciones'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private ventaService: VentasService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.ventaService.obtenerVentas().subscribe( (ventas: any) => {
      this.ventas = ventas;
      this.listaDatos = new MatTableDataSource(this.ventas);
      this.listaDatos.sort = this.sort;
      this.listaDatos.paginator = this.paginator;
    }, (err:any) => {
      this.toastr.error(err.error.message, 'Ventas App');
    })
  }

  editarVenta(ventaid: number) {
    this.router.navigate(["/venta", ventaid]);
  }

  borrarVenta(ventaid: number, idx: number) {
    const respuesta = confirm(`Esta seguro que desea eliminar la orden nº ${ventaid}`);
    if(!respuesta) {
      return;
    }
    
    this.ventaService.borrarVenta(ventaid).subscribe((res: any) => {
      this.ventas.splice(idx, 1);
        this.toastr.success(res.message, 'Ventas App');
      this.listaDatos.data = this.ventas;
    }, (err: any) => {
      this.toastr.error(err.error.message, 'Ventas App');
    })
  }

}
