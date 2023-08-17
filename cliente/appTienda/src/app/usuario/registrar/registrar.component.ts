import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import Geonames from 'geonames.js';

interface MetodoPago {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit{
  metodos: MetodoPago[] = [
    {value: 'Tarjeta', viewValue: 'Tarjeta'},
    {value: 'Efectivo', viewValue: 'Efectivo'},
    {value: 'Sinpe Movil', viewValue: 'Sinpe Movil'}
  ];

  isClient:Boolean
  isVendAdmin:Boolean
  provincias:any
  cantones:any
  distritos:any
  hide = true;
  usuario: any;
  roles: any;
  formCreate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      nombre: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contrasenna: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      metodo: ['', [Validators.required]],
      proveedor: ['', [Validators.required]],
      numeroCuenta: ['', [Validators.required]],
      fechaExpiracion: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      canton: ['', [Validators.required]],
      distrito: ['', [Validators.required]],
      direccionExacta: ['', [Validators.required]],
      codPostal: ['', [Validators.required]],
    });
    this.getRoles();
  }
  
  ngOnInit(): void {
    this.listaProvincias()
  }
  
  listaProvincias(){
    const geonames = Geonames({
      username: 'luisamores',
      lan: 'en',
      encoding: 'JSON'
    });

    geonames.children({'geonameId':3624060}).then((resp) => {
      console.log(resp.geonames)
      this.provincias = resp.geonames
    })
  }

  listaCantones(provincia:any){
    const geonames = Geonames({
      username: 'luisamores',
      lan: 'en',
      encoding: 'JSON'
    });

    geonames.children({'geonameId':provincia}).then((resp) => {
      console.log(resp.geonames)
      this.cantones = resp.geonames
    })
  }

  listaDistritos(canton:any){
    const geonames = Geonames({
      username: 'luisamores',
      lan: 'en',
      encoding: 'JSON'
    });

    geonames.children({'geonameId':canton}).then((resp) => {
      console.log(resp.geonames)
      this.distritos = resp.geonames
    })
  }

  capturarRol(event:any){
    console.log(event)
    if (event.nombre == "CLIENTE") {
      this.isClient = true
    } else {
      this.isClient = false
    }
  }

  submitForm() {
    this.makeSubmit=true;
    //Validación
    if(this.formCreate.invalid){
     return;
    }
    this.authService.createUser(this.formCreate.value)
    .subscribe((respuesta:any)=>{
      this.usuario=respuesta;

      let direccion = {
        usuarioId: this.usuario.data.id,
        provincia: this.formCreate.value.provincia,
        canton: this.formCreate.value.canton,
        distrito: this.formCreate.value.distrito,
        direccionExacta: this.formCreate.value.direccionExacta,
        codPostal: this.formCreate.value.codPostal,
        telef: this.formCreate.value.telefono,
      }

      this.gService.create('direccion',direccion).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{})

      let metodo = {
        idCliente: this.usuario.data.id,
        descripcion: this.formCreate.value.metodo,
        proveedor: this.formCreate.value.proveedor,
        numeroCuenta: this.formCreate.value.numeroCuenta,
        fechaExpiracion: new Date(this.formCreate.value.fechaExpiracion)
      }

      this.gService.create('metodo',metodo).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{})

      this.router.navigate(['/usuario/login'],{
        //Mostrar un mensaje
        queryParams:{register:'true'},
      })
    })


  }
  onReset() {
    this.formCreate.reset();
  }  

  getRoles() {
    this.gService
      .list('rol')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.roles = data;
        console.log( this.roles);
      });
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };
}
