import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject , takeUntil} from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit{
  datos:any;//Guarda la respuesta del API
  vistas:any
  destroy$: Subject<boolean>=new Subject<boolean>();
  preguntas:boolean = false
  respuestas: boolean = false
  fotos: boolean = false
  currentUser: any
  ruta: String = ''
  img:any
  isAdmin:boolean = false
  isVend:boolean = false
  isClient:boolean = false
  authenticated: boolean = false
  id:any


  constructor(private gService: GenericService,    
    private cartService:CartService,
    private notificacion:NotificacionService,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    ){
      //Obtener el parámetro
      let id=this.route.snapshot.paramMap.get('id');
      if(!isNaN(Number(id))){
        this.obtenerRopa(id);
      }
      this.id = id
  }

  ngOnInit(): void {
    if(!isNaN(Number(this.id))){
      this.obtenerRopa(this.id);
    }
    this.auth.currentUser.subscribe((x)=>{this.currentUser=x;
      if (this.currentUser == null) {
        this.authenticated = false
        this.isClient = false
        this.isAdmin = false
        this.isVend = false
       } else if (this.currentUser.user.rol == 'ADMINISTRADOR') {
        this.authenticated = true
        this.isClient = false
        this.isAdmin = true
        this.isVend = false
       } else if (this.currentUser.user.rol == 'VENDEDOR') {
        this.ruta = '/ropa/lista-vendedor'
        this.authenticated = true
        this.isClient = false
        this.isAdmin = false
        this.isVend = true
       } else if (this.currentUser.user.rol == 'CLIENTE') {
        this.ruta = '/ropa/lista-cliente'
        this.authenticated = true
        this.isClient = true
        this.isAdmin = false
        this.isVend = false
       }
    });
  }

  obtenerRopa(id:any){
    this.gService
    .get('ropa',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        this.datos=data;      
        this.img = this.datos.fotos[0].foto
        if (this.datos.fotos[0] != undefined) {
          this.fotos = true
        } else {
          this.fotos = false
        }
        if (this.datos.preguntas[0] != null) {
          this.preguntas = true
          if (this.datos.preguntas[0].respuestas != null) {
            this.respuestas = true
          } else{
            this.respuestas = false
          }
        } else {
          this.preguntas = false          
        }
    });   
  }

  public convertDataUrlToBlob(dataUrl): Blob {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], {type: mime});
  }

  realizarPregunta(){
    this.router.navigate(['/ropa/preguntas',this.id],
    {      
      relativeTo:this.route
    })
  }

  responder(id:Number){
    this.router.navigate(['/ropa/respuestas',id],
    {
      relativeTo:this.route
    })
  }

  comprar(id:Number){
    this.gService
    .get('ropa',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      //Agregar videojuego obtenido del API al carrito
      this.cartService.addToCart(data);
      //Notificar al usuario
      this.cartService.actualizarCantidad()
      this.notificacion.mensaje(
        'Orden',
        'Producto: '+data.nombre+ ' agregado a la orden',
        TipoMessage.success
      )
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
