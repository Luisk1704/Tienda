import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject , takeUntil} from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.component.html',
  styleUrls: ['./detalles-pedido.component.css']
})
export class DetallesPedidoComponent {
  datos:any;//Guarda la respuesta del API
  vistas:any
  destroy$: Subject<boolean>=new Subject<boolean>();

  constructor(private gService: GenericService,
    private route: ActivatedRoute
    ){
      
      //Obtener el parámetro
      let id=this.route.snapshot.paramMap.get('id');
      console.log(id)
      if(!isNaN(Number(id))){
        this.obtenerVideojuego(id);
      }
  }
  obtenerVideojuego(id:any){
    this.gService
    .get('pedido',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        console.log(data)
        this.datos=data;
    });
   
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
