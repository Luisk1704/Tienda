import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject , takeUntil} from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements AfterViewInit {
  datos:any;//Guarda la respuesta del API
  destroy$: Subject<boolean>=new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource=new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','marca','precio','estado'];

  constructor(private gService:GenericService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngAfterViewInit(): void {
    this.listaVendedor();
  }
  //Llamar al API y obtener la lista de videojuegos
  listaVendedor(){
    //localhost:3000/videojuego/
    this.gService
      .list('ropa/vendedor/5')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
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
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
