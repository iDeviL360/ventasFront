import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';


import { ClienteService } from '../../services/cliente.service';
import { VentaItemsComponent } from '../venta-items/venta-items.component';
import { Cliente } from 'src/app/models/cliente.model';
import { Producto } from 'src/app/models/producto.model';
import { Venta } from 'src/app/models/venta.model';
import { VentasService } from 'src/app/services/ventas.service';
import { ClienteComponent } from '../cliente/cliente.component';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styles: []
})
export class VentaComponent implements OnInit {

  
  public cliente: Cliente = new Cliente();
  public venta: Venta = new Venta();
  public totalVentas: any = 0;
  public totalComision: number = 0;
  public ventaItemsDel: number[] = [];


  constructor(private clienteService: ClienteService,
              private ventaService: VentasService,
              private dialog: MatDialog,
              private toastr: ToastrService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const ventaid = this.activatedRoute.snapshot.paramMap.get('ventaid');
    if(ventaid != null) {
      this.ventaService.obtenerVentaPorId(ventaid).subscribe((res: any) => {
        this.venta.ventaid = res.ventaid;
        this.cliente.cedula = res.cliente.cedula;
        this.venta.total = res.total;

        
        res.ventaItems.forEach((elemento:any) => {
          this.venta.ventaItems.push({
            productoid: elemento.productoid,
            descripcion: elemento.productos[0].descripcion,
            codigoproducto: elemento.productos[0].codigoproducto,
            precio: elemento.precio,
            ventadetalleid: elemento.ventadetalleid
          })
        });

        this.obtenerClientePorCedula();
        this.calcularTotal();
      }, (err : any) => {
        this.toastr.error(err.error.message, 'Ventas App');
        this.router.navigateByUrl('/ventas');
      })
    }
  }

  obtenerClientePorCedula() {

    if(this.cliente.cedula == null) return;

    this.clienteService.obtenerClientePorCedula(this.cliente.cedula)
        .subscribe( (cliente:Cliente) => {
          if(!cliente) {
            this.cliente.clienteid = null;
            this.cliente.nombre = '';
            this.venta.clienteid = null;
            return;
          }
          this.cliente = cliente;
          this.venta.clienteid = this.cliente.clienteid;
    });
  }

  agregarEditarItems(item: Producto = null, idx:number = null) {

    const dialogRef = this.dialog.open(VentaItemsComponent, {
      data: item,
      width: '800px'
    })
    
    dialogRef.afterClosed().subscribe( (producto: Producto) => {
      if(producto == null) {
        return;
      }

      const existe = this.venta.ventaItems.some(item => {
        if(item.codigoproducto == producto.codigoproducto) {
          return item;
        }
      })

      if(existe) {
        this.toastr.warning('El item que intenta agregar ya existe', 'Ventas App');
      } else {
        if(idx != null) {
          this.venta.ventaItems[idx] = producto;
          this.venta.ventaItems[idx].ventadetalleid = item.ventadetalleid;
        } else {
          this.venta.ventaItems.push(producto);
        }
        this.calcularTotal();
      }
    })
  }

  eliminarItem(idx: number) {
    if(this.venta.ventaid != null) {
      this.ventaItemsDel.push(this.venta.ventaItems[idx].ventadetalleid);
    }
    this.venta.ventaItems.splice(idx, 1);
    this.calcularTotal();
  }

  //Calculamos el total de la venta utilizando el metodo reduce en la propiedad ventaitems 
  calcularTotal():any {
    if(this.venta.ventaItems.length > 0) {
      this.totalVentas = this.venta.ventaItems.reduce( (prev:any, curr:any) => {
        return { 
          codigoproducto: '',
          precio: prev.precio + curr.precio,
          descripcion: '',
          productoid: 0,
          ventadetalleid: null
        };
      });
    } else {
      this.totalVentas.precio = null;
    }
    this.totalComision = (this.totalVentas.precio * 40) / 100;
    this.venta.total = this.totalVentas.precio;
  }

  guardarEditarVenta(form: NgForm) {
    //Checkeamos que el form sea valido
    if(form.invalid) {
      return;
    }

    //Checkeamos la propiedad ventaid si tiene algo guardamos y si no tiene nada es una nueva venta.
    if(this.venta.ventaid != null) {
      this.ventaService.editarVenta(this.venta.ventaid, this.venta, this.ventaItemsDel).subscribe( (res:any) => {
        this.toastr.success(res.message, 'Ventas App');
        this.router.navigateByUrl("/ventas");
      });
    } else { 
      this.ventaService.guardarVenta(this.venta).subscribe( (res:any) => {
        this.toastr.success(res.message, 'Ventas App');
        this.router.navigate(['/ventas']);
      }, (err:any) => {
        this.toastr.error(err.message, 'Ventas App')
      });
    }
  }

  agregarCliente() {
    const dialogRef = this.dialog.open(ClienteComponent, {
      width: '600px'
    })

    dialogRef.afterClosed().subscribe( (nuevoCliente: Cliente) => {
      if(nuevoCliente) {
        this.clienteService.guardarCliente(nuevoCliente).subscribe((res: Cliente) => {
          this.cliente.clienteid = res.clienteid;
          this.cliente.cedula = res.cedula;
          this.cliente.nombre = res.nombre;
          this.venta.clienteid = res.clienteid;
          this.toastr.success('Cliente creado con exito', 'Ventas App');
        }, (err) => {
          this.toastr.error(err.error.message);
        })
      } 

    })
  }
}
