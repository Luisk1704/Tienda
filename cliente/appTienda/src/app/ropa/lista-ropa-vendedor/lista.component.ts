import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject , takeUntil} from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { HttpErrorInterceptorService } from 'src/app/share/http-error-interceptor.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements AfterViewInit, OnInit {
  currentUser:any
  datos:any;//Guarda la respuesta del API
  destroy$: Subject<boolean>=new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource=new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','descripcion','precio','estado','acciones'];

  constructor(private gService:GenericService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpErrorInterceptorService) {

  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
  }

  ngAfterViewInit(): void {
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    this.listaVendedor();
  }
  //Llamar al API y obtener la lista de videojuegos
  listaVendedor(){
    console.log(this.currentUser)
    //localhost:3000/videojuego/
    this.gService
      .list('ropa/vendedor/'+this.currentUser.user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        this.datos=data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        //this.dataSource.paginator = this.paginator;       
      })
  }
  
  detalleProducto(id:Number){
    this.router.navigate(['/ropa',id],
    {
      relativeTo:this.route
    })
  }

  actualizarProducto(id:Number){
    this.router.navigate(['/ropa/crear-ropa',id],
    {
      relativeTo:this.route
    })
  }

  crearRopa(){
    this.router.navigate(['/ropa/crear-ropa'],
    {
      relativeTo:this.route
    })
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
