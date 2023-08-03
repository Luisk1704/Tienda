import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { Buffer} from 'buffer';

interface Estado {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-crear-ropa',
  templateUrl: './crear-ropa.component.html',
  styleUrls: ['./crear-ropa.component.css']
})
export class CrearRopaComponent implements OnInit {
  estados: Estado[] = [
    {value: 'Nuevo', viewValue: 'Nuevo'},
    {value: 'Usado como nuevo', viewValue: 'Usado como nuevo'},
    {value: 'Usado en buen estado', viewValue: 'Usado en buen estado'},
    {value: 'Usado aceptable', viewValue: 'Usado aceptable'}
  ];;
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  //Titulo
  titleForm: string = 'Crear';
  //Lista de generos
  fotos: any;
  categorias:any
  proveedores:any

  file1: File;
  file2: File;
  fotoselec: string | ArrayBuffer
  fotoselec2 : string | ArrayBuffer
  //Videojuego a actualizar
  ropaInfo: any;
  //Respuesta del API crear/modificar
  respRopa: any;
  //Sí es submit
  submitted = false;
  //Nombre del formulario
  ropaForm: FormGroup;
  //id del Videojuego
  idRopa: number = 0;
  //Sí es crear
  Crear: boolean = true;
  currentUser:any
  respFoto: any

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    this.formularioReactive();
    this.listaCategorias();
    this.listaProveedores();
  }
  ngOnInit(): void {    
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idRopa=params['id'];
      if(this.idRopa!=undefined){
        this.Crear=false;
        this.titleForm="Actualizar";
         //Obtener videojuego a actualizar del API
         this.gService.get('ropa',this.idRopa).pipe(takeUntil(this.destroy$))
         .subscribe((data:any)=>{
          this.ropaInfo=data;
          console.log(this.ropaInfo)
          //Establecer los valores en cada una de las entradas del formulario
          this.ropaForm.setValue({
            id:this.ropaInfo.id,
            vendedorId:this.ropaInfo.vendedorId,
            nombre:this.ropaInfo.nombre,
            precio:this.ropaInfo.precio,
            estado:this.ropaInfo.estado,
            cantidad:this.ropaInfo.cantidad,
            proveedorId:this.ropaInfo.proveedorId,
            categorias:this.ropaInfo.categorias.map(({id}) => id),            
            /*foto1:this.ropaInfo.fotos[0],
            foto2:this.ropaInfo.fotos[1]*/
          })          
         });
      }

    });
  }
  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.ropaForm=this.fb.group({
      id:[null,null],
      vendedorId: [null,null],
      nombre:[null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ])],
      precio: [null, Validators.required],
      estado: [null, Validators.required],
      cantidad: [null, Validators.required],
      proveedorId: [null, Validators.required],
      /*foto1: [null,null],
      foto2: [null,null],*/
      categorias: [null, Validators.required],      
    })
  }

  public capturarImagen(event: any):void{
    if (event.target.files && event.target.files[0]) {
      this.file1 = event.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => this.fotoselec = reader.result
      reader.readAsDataURL(this.file1)
    }
  }

  public capturarImagen2(event: any):void{
    if (event.target.files && event.target.files[0]) {
      this.file2 = event.target.files[0]
      const reader = new FileReader()    
      reader.onload = (e) => this.fotoselec2 = reader.result
      reader.readAsDataURL(this.file2)         
    }    
  }

  private enviar(param): void{

  }
  
  public errorHandling = (control: string, error: string) => {
    return this.ropaForm.controls[control].hasError(error);
  };
  //Crear Videojueogo
  crearRopa(): void {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if(this.ropaForm.invalid){
      return;
    }
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let gFormat:any=this.ropaForm.get('categorias').value.map(x=>({['id']: x}))
    //Asignar valor al formulario
    this.ropaForm.patchValue({categorias: gFormat});  
    
    
    // //Accion API create enviando toda la informacion del formulario
    // var split = (this.ropaForm.value.foto2).split("fakepath\\")

    this.ropaForm.value.vendedorId = this.currentUser.user.id
    this.gService.create('ropa',this.ropaForm.value).pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      //Obtener respuest
      
      this.respRopa = data;
      /*let foto = {
        id: this.respRopa.id,
        foto2: btoa(this.fotoselec2.toString())//Buffer.from(this.fotoselec2.toString()).toString('ascii')
      }
      
            
      this.gService.create('foto',foto)
      .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respFoto = data;     
      })*/
      this.router.navigate(['/ropa/lista-vendedor'],{
        queryParams: {create:'true'}
      });        
    })
    

      
      


      // this.gService.create('foto',formData)
      //   .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //   //Obtener respuesta
      //   this.respFoto = data;      
      // });
      
    // });  
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

  listaProveedores(){
    this.proveedores = null;
    this.gService.list('proveedor').pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      this.proveedores = data
    })
  }

  //Actualizar Videojuego
  actualizarRopa() {
    //Establecer submit verdadero
    this.submitted=true;
    //Verificar validación
    if(this.ropaForm.invalid){
      return;
    }
    
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let gFormat:any=this.ropaForm.get('categorias').value.map(x=>({['id']: x }));
    //Asignar valor al formulario 
    this.ropaForm.patchValue({categorias:gFormat});
    //Accion API create enviando toda la informacion del formulario
    this.ropaForm.value.vendedorId = this.currentUser.user.id
    this.gService.update('ropa',this.ropaForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respRopa=data;
      this.router.navigate(['/ropa/lista-vendedor'],{
        queryParams: {update:'true'}
      });
    });
  }
  onReset() {
    this.submitted = false;
    this.ropaForm.reset();
  }
  onBack() {
    this.router.navigate(['/videojuego/all']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
