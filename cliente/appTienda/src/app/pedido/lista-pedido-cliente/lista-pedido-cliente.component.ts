import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil} from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import Geonames from 'geonames.js';

@Component({
  selector: 'app-lista-pedido-cliente',
  templateUrl: './lista-pedido-cliente.component.html',
  styleUrls: ['./lista-pedido-cliente.component.css']
})
export class ListaPedidoClienteComponent implements AfterViewInit {
  datos:any;//Guarda la respuesta del API
  destroy$: Subject<boolean>=new Subject<boolean>();
  currentUser:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource=new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['compra','descuento','estado', 'subtotal','acciones'];

  constructor(private gService:GenericService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) {

  }

  ngAfterViewInit(): void {
    this.authService.currentUser.subscribe((x)=>{this.currentUser=x;})
    this.listaCliente();

    const geonames = Geonames({
      username: 'luisamores',
      lan: 'en',
      encoding: 'JSON'
    });
    // console.log(geonames.search({q:'Costa Rica'}))
    geonames.children({'geonameId':3624060}).then((resp) => {
      console.log(resp)
    })

    geonames.children({'geonameId':3624953}).then((resp) =>{
      console.log(resp)
    })

    geonames.children({'geonameId':3621940}).then((resp) =>{
      console.log(resp)
    })
  }
  //Llamar al API y obtener la lista de videojuegos
  listaCliente(){
    //localhost:3000/videojuego/
    this.gService
      .list('pedido/cliente/'+this.currentUser.user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        //this.dataSource.paginator = this.paginator;       
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
