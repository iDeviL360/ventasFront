import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/models/producto.model';



@Component({
  selector: 'app-venta-items',
  templateUrl: './venta-items.component.html',
  styles: []
})
export class VentaItemsComponent implements OnInit {

  productos: Producto[];
  productoSeleccionado: Producto;

  constructor(private dialogRef: MatDialogRef<VentaItemsComponent>,
              @Inject(MAT_DIALOG_DATA) private data:any,
              private productoService: ProductosService) { 

    this.productoService.obtenerProductos()
        .subscribe(( producto: Producto[])=> {
          this.productos = producto;
    })

    this.productoSeleccionado = data;
  }

  ngOnInit() {

  }

  actualizarTxt(productoid: any) {
    if(productoid == 0) {
      this.productoSeleccionado = null;
      return;
    }
    this.productos.find(producto => {
      if(producto.productoid == productoid) {
        this.productoSeleccionado = producto;
      }
    });

  }


  agregarItem() {
    if(this.productoSeleccionado == null) {
      return;
    }
    this.dialogRef.close(this.productoSeleccionado);
  }

  cerrar() {
    this.dialogRef.close();
  }


}
