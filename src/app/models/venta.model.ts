import { VentaDetalle } from './venta-detalle.model';
import { Producto } from './producto.model';

export class Venta {
    ventaid: number; 
    clienteid: number;
    total: number;
    fecha: string;
    ventaItems: Producto[] = [];
}