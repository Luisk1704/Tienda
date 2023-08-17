import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
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
  public IV = 0.13;
  public impuesto = 0;
  public fecha = Date.now()
  public qtyItems = 0
  public dataSourse = new MatTableDataSource<any>()
  public metodo:any
  public listaFormasPago:any;
  public ListaDir:any
  public direccion:any
  public destroy$: Subject<boolean>=new Subject<boolean>();
  public currentUser:any
  displayedColumns: string[] = ['producto', 'precio', 'cantidad', 'subtotal','acciones'];
  
  constructor(private gService: GenericService,
  private router: Router,
  private authService: AuthenticationService,
  private cart: CartService, 
  private noti: NotificacionService) {
    this.authService.currentUser.subscribe((x)=>{this.currentUser=x})
    this.listaMetodos()
    this.listaDirecciones()
  }

  ngOnInit(): void {
    this.cart.currentDataCart$.subscribe(data =>
      this.dataSourse = new MatTableDataSource(data)
    )
    this.authService.currentUser.subscribe((x)=>{this.currentUser=x})
    this.impuesto = this.cart.getTotal()*this.IV
    this.total = this.cart.getTotal()+(this.cart.getTotal()*this.IV)   
  }

  listaMetodos(){
    this.gService    
    .get('metodo',this.currentUser.user.id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{        
        this.listaFormasPago=data;
        console.log(this.listaFormasPago)
    });
  }

  listaDirecciones(){
    this.gService    
    .get('direccion',this.currentUser.user.id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{       
        this.ListaDir=data;
    });
  }

  capturarPago(metodoOpcion:any){
    this.metodo = metodoOpcion
    console.log(this.metodo)
  }

  capturarDireccion(dirOpcion:any){
    if (dirOpcion != null) {
      this.direccion = dirOpcion
    } else {
      this.direccion = this.ListaDir[0].id
    }
    console.log(this.direccion)
  }

  actualizarCantidad(item: any) {
    this.cart.addToCart(item);
    this.total=this.cart.getTotal()+(this.cart.getTotal()*this.IV);
     this.noti.mensaje('Orden',
    'Cantidad actualizada: '+item.cantidad,
    TipoMessage.info) 
  }

  eliminarItem(item: any) {
    this.cart.removeFromCart(item);
    this.total=this.cart.getTotal();
    this.noti.mensaje('Orden',
    'Producto eliminado',
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
          ['cantidad']: x.cantidad,
          ['subtotal']:x.subtotal
        })
      )

      //Datos para el API
      console.log(this.metodo)
      console.log(this.direccion)
      let infoPedido = {
        'idPago': this.metodo,
        'clienteId': this.currentUser.user.id,
        'direccionId': this.direccion,
        'ropas':detalles,
        'subtotal': this.cart.getTotal(),
        'Total': this.total,
      }

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
   this.router.navigate(['/ropa/lista-cliente'],{
    queryParams: {create:'true'}
  });
  }
}
