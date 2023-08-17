import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, NgIterable, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject,takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})



export class ListaComponent implements AfterViewInit{
  datos:any;//Guarda la respuesta del API
  destroy$: Subject<boolean>=new Subject<boolean>();
  habilitado:Boolean

  clases:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource=new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombre', 'cedula','correo','habilitado'];

  constructor(private gService:GenericService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngAfterViewInit(): void {
    this.listaUsuarios();
  }
  //Llamar al API y obtener la lista de videojuegos
  listaUsuarios(){
    let usuarios = [];    
    //localhost:3000/videojuego/
    this.gService
      .list('usuario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{ 
        data.forEach(element => {
          let usuario = {
            id: element.id,
            nombre: element.nombre,
            cedula: element.cedula,
            correo: element.correo,
            clase: element.estado?'verde':'rojo',
            titulo: element.estado?'Habilitado':'Inhabilitado'
          }
          usuarios.push(usuario)
        });
        this.datos = usuarios
        this.dataSource = new MatTableDataSource(this.datos);
        // this.dataSource.sort = this.sort;
        //this.dataSource.paginator = this.paginator;       
      })
  }

  cambiarEstado(usuario){
    this.gService.get('usuario',usuario.id).pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      let nuevoUsuario = {
        id: data.id,
        estado: data.estado?false:true
      }
      this.gService.update('usuario',nuevoUsuario).pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        this.listaUsuarios()
      })
    });  
  }
  //localhost:3000/videojuego/1
  detalleUsuario(id:Number){
    this.router.navigate(['/usuario',id],
    {
      relativeTo:this.route
    })
  }
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
