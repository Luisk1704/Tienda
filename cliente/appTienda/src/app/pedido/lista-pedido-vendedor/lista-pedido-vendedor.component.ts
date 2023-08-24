import { AfterViewInit,OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-lista-pedido-vendedor',
  templateUrl: './lista-pedido-vendedor.component.html',
  styleUrls: ['./lista-pedido-vendedor.component.css']
})
export class ListaPedidoVendedorComponent implements AfterViewInit,OnInit{
  datos:any;//Guarda la respuesta del API
  destroy$: Subject<boolean>=new Subject<boolean>();
  indices:String = ""
  currentUser:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource=new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['producto','subtotal','estado'];

  constructor(private gService:GenericService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
  }

  cambiarEstado(pedido){
    this.gService.get('pedido',pedido.id).pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      let nuevopedido = {
        id: data.id,
        estado: 'entregado'
      }
      this.gService.update('pedido',nuevopedido).pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        this.listaVendedor()
      })
    });  
  }

  listaPendientes(){
    let pedidos = []
    this.gService
      .list('pedido/vendedor/'+this.currentUser.user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        data.forEach(element => {
          if (element.estado == 'pendiente') {
            let pedido = {
              id: element.id,
              producto: element.ropas[0].ropa.nombre,
              subtotal: element.ropas[0].subtotal,
              estado: element.estado,
              clase: element.estado == 'pendiente'?'rojo':'verde',
              entregado: element.estado == 'entregado'?true:false
            }
            pedidos.push(pedido)
          }          
        });
        // if (data == null) {
        //   console.log("hola")
        // }
        this.datos=pedidos;
        // for (let i = 0; i < data.length; i++) {
        //   this.indices += ""+i;          
        // }
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;       
      })
  }

  listaEntregados(){
    let pedidos = []
    this.gService
      .list('pedido/vendedor/'+this.currentUser.user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        data.forEach(element => {
          if (element.estado == 'entregado') {
            let pedido = {
              id: element.id,
              producto: element.ropas[0].ropa.nombre,
              subtotal: element.ropas[0].subtotal,
              estado: element.estado,
              clase: element.estado == 'pendiente'?'rojo':'verde',
              entregado: element.estado == 'entregado'?true:false
            }
            pedidos.push(pedido)
          }          
        });
        // if (data == null) {
        //   console.log("hola")
        // }
        this.datos=pedidos;
        // for (let i = 0; i < data.length; i++) {
        //   this.indices += ""+i;          
        // }
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;       
      })
  }

  ngAfterViewInit(): void {
    this.listaVendedor();
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
  }
  //Llamar al API y obtener la lista de videojuegos
  listaVendedor(){
    //localhost:3000/videojuego/
    let pedidos = []
    this.gService
      .list('pedido/vendedor/'+this.currentUser.user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        data.forEach(element => {
          let pedido = {
            id: element.id,
            producto: element.ropas[0].ropa.nombre,
            subtotal: element.ropas[0].subtotal,
            estado: element.estado,
            clase: element.estado == 'pendiente'?'rojo':'verde',
            entregado: element.estado == 'entregado'?true:false
          }
          pedidos.push(pedido)
        });
        // if (data == null) {
        //   console.log("hola")
        // }
        this.datos=pedidos;
        // for (let i = 0; i < data.length; i++) {
        //   this.indices += ""+i;          
        // }
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;       
      })
  }
  
  detallePedido(id:Number){
    this.router.navigate(['/pedido',id],
    {
      relativeTo:this.route
    })
  }
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
