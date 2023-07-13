import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject , takeUntil} from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent {
  datos:any;//Guarda la respuesta del API
  vistas:any
  destroy$: Subject<boolean>=new Subject<boolean>();

  constructor(private gService: GenericService,
    private route: ActivatedRoute
    ){
      //Obtener el parámetro
      let id=this.route.snapshot.paramMap.get('id');
      if(!isNaN(Number(id))){
        this.obtenerVideojuego(id);
      }
  }
  obtenerVideojuego(id:any){
    this.gService
    .get('ropa',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        this.datos=data;
    });
   
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
