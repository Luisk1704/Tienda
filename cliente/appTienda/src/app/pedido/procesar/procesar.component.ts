import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-procesar',
  templateUrl: './procesar.component.html',
  styleUrls: ['./procesar.component.css']
})
export class ProcesarComponent implements OnInit{
  public total = 0;
  public fecha = Date.now()
  public qtyItems = 0
  public dataSourse = new MatTableDataSource<any>()
  public metodos:any
  public destroy$: Subject<boolean>=new Subject<boolean>();
  public currentUser:any
  displayedColumns: string[] = ['producto', 'precio', 'cantidad', 'subtotal','acciones'];
  
  constructor(private gService: GenericService,
  private cart: CartService, 
  private noti: NotificacionService) {
    this.currentUser = gService.currentUser
  }

  ngOnInit(): void {
    this.cart.currentDataCart$.subscribe(data =>
      this.dataSourse = new MatTableDataSource(data)
    )
    this.total = this.cart.getTotal()
    this.gService
    .get('metodo/',this.currentUser.id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        this.metodos=data;
    });
  }

  actualizarCantidad(item: any) {
    this.cart.addToCart(item);
    this.total=this.cart.getTotal();
   /*  this.noti.mensaje('Orden',
    'Cantidad actualizada: '+item.cantidad,
    TipoMessage.info) */
  }
  eliminarItem(item: any) {
    this.cart.removeFromCart(item);
    this.total=this.cart.getTotal();
    this.noti.mensaje('Orden',
    'Videojuego eliminado',
    TipoMessage.warning)
  }
  registrarOrden() {
   if(this.cart.getItems!=null){
      //Obtener los items del carrito de compras
      let itemsCarrito=this.cart.getItems;
      //Armar la estructura de la tabla intermedia
      //[{'videojuegoId':valor, 'cantidad':valor}]
      let detalles=itemsCarrito.map(
        x=>({
          ['idRopa']:x.idItem,
          ['cantidad']: x.cantidad
        })
      )
      //Datos para el API
      let infoPedido = {
        'idPago': this.metodos[0].id,
        'clienteid': this.currentUser.id,
        'ropas':detalles,

      }

    //   data:{
    //     idPago: pedido.idPago,
    //     clienteId: pedido.clienteId,
    //     direccionId: pedido.direccionId, 
    //     descuento: 0.12,
    //     IV: 0.13,
    //     estado: 'pendiente',
    //     subtotal: pedido.subtotal,
    //     Total: pedido.Total,
    //     ropas:{
    //         connect: pedido.ropas
    //     }
    // }
      this.gService.create('pedido',infoPedido)
      .subscribe((respuesta:any)=>{
        this.noti.mensaje('Orden',
        'Orden registrada #'+respuesta.id,
        TipoMessage.success)
        this.cart.deleteCart();
        this.total=this.cart.getTotal();
      })
   }else{
    this.noti.mensaje('Orden',
    'Agregue videojuegos a la orden',
    TipoMessage.warning)
   }
  }
}
