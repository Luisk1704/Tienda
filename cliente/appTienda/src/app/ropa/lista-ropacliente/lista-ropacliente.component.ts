import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-lista-ropacliente',
  templateUrl: './lista-ropacliente.component.html',
  styleUrls: ['./lista-ropacliente.component.css']
})

// interface categoria {
//   value: string;
//   viewValue: string;
// }

export class ListaRopaclienteComponent {
  datos:any;//Guarda la respuesta del API
  listaProductos:any
  categ:boolean = false
  asc:boolean = false
  categorias:any
  destroy$: Subject<boolean>=new Subject<boolean>();
  // _categorias: categoria[] = [
  //   {value: 'Nuevo', viewValue: 'Nuevo'},
  //   {value: 'Usado como nuevo', viewValue: 'Usado como nuevo'},
  //   {value: 'Usado en buen categoria', viewValue: 'Usado en buen categoria'},
  //   {value: 'Usado aceptable', viewValue: 'Usado aceptable'}
  // ];
  Lista_produc:Array<any>; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource=new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombre', 'cedula','correo'];

  constructor(private gService:GenericService,
    private router: Router,
    private route: ActivatedRoute) {
      this.listaCliente();
      this.listaCategorias();
  }

  //Llamar al API y obtener la lista de videojuegos
  listaCliente(){
    //localhost:3000/videojuego/
    this.gService
      .list('ropa/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        this.datos=data;
        this.listaProductos = this.datos       
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        //this.dataSource.paginator = this.paginator;       
      })
  }

  listaCategorias() {
    this.categorias = null;
    this.gService
      .list('categoria')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.categorias = data;
      });
  }

  ordenar(){
    if (!this.asc) {
      this.gService
      .list('ropa/precio_asc')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.listaProductos = data;
        this.asc = true
      });
    } else {
      this.gService
      .list('ropa/precio_desc')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.listaProductos = data;
        this.asc = false
      });
    }
  }



  filtroCategoria(event?:any){
    this.Lista_produc = new Array<any>()
    if (!event) {
      this.listaProductos = this.datos
    } else {
      this.datos.forEach(ropa => {
        ropa.categorias.forEach(element => {
          if (element.descripcion == event.descripcion) {
            this.categ = true
          } else {
            this.categ = false
          }
        });
        var arr
        if (this.categ) {
          this.Lista_produc.push(ropa)
        }
        this.categ = false      
      });
      this.listaProductos = this.Lista_produc
    }    
    this.Lista_produc = null
  }
  //localhost:3000/videojuego/1
  detalleProducto(id:Number){
    this.router.navigate(['/ropa',id],
    {      
      relativeTo:this.route
    })
  }

  preguntas(id:Number){
    this.router.navigate(['/ropa/preguntas',id],
    {      
      relativeTo:this.route
    })
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
