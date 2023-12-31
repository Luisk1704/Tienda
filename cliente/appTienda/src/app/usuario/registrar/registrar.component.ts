import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import Geonames from 'geonames.js';
import { MatTableDataSource } from '@angular/material/table';

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


  listaDir:any
  listaPag:any

  dir:Boolean = false;
  pay:Boolean = false;
  dataSourceDir=new MatTableDataSource<any>();
  dataSourcePay=new MatTableDataSource<any>();
  displayedDirecciones = ['provincia', 'canton','distrito'];
  displayedPagos = ['metodo', 'proveedor','cuenta'];
  direccionForm:Boolean = false
  pagoForm:Boolean = false
  direcciones:Array<Object> = new Array<Object>
  pagos: Array<Object> = new Array<Object>
  provincia:any
  canton:any
  distrito:any
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
    this.listaDirecciones()
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
  
  habilitarDireccion(){
    if (this.direccionForm) {
      this.direccionForm = false
    } else {
      this.direccionForm = true
      this.formCreate.value.provincia.reset()  
    }
  }

  agregarDireccion(){
    let direccion = {
      provincia: this.formCreate.value.provincia,
      canton: this.formCreate.value.canton,
      distrito: this.formCreate.value.distrito,
      direccionExacta: this.formCreate.value.direccionExacta,
      codPostal: this.formCreate.value.codPostal
    }
    this.direcciones.push(direccion)
    this.direccionForm = false
    this.dir = true
    this.listaDirecciones()
  }

  habilitarPago(){
    if (this.pagoForm) {
      this.pagoForm = false
    } else {
      this.pagoForm = true
      this.formCreate.value.metodo.reset()      
    }    
  }

  agregarPago(){
    let pago = {
      metodo: this.formCreate.value.metodo,
      proveedor: this.formCreate.value.proveedor,
      numeroCuenta: this.formCreate.value.numeroCuenta,
      fechaExpiracion: new Date(this.formCreate.value.fechaExpiracion)
    }
    this.pagos.push(pago)
    this.pagoForm = false
    this.pay = true
    this.listaMetodos()
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

    geonames.search({'name':'Costa Rica'}).then(resp => {
      console.log(resp)
    })

    geonames.children({'geonameId':3624060}).then((resp) => {
      this.provincias = resp.geonames
    })
  }

  listaCantones(event?:any){
    const geonames = Geonames({
      username: 'luisamores',
      lan: 'en',
      encoding: 'JSON'
    });

    this.provincia = event
    geonames.children({'geonameId':event}).then((resp) => {
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
      
      this.listaDir = this.direcciones
      this.listaPag = this.pagos

      this.listaDir.forEach(element => {
        let direccion = {
          usuarioId: this.usuario.data.id,
          provincia: element.provincia,
          canton: element.canton,
          distrito: element.distrito,
          direccionExacta: element.direccionExacta,
          codPostal: element.codPostal,
          telef: this.formCreate.value.telefono,
        }
        this.gService.create('direccion',direccion).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{})
      });
      
      this.listaPag.forEach(element => {
        let metodo = {
          idCliente: this.usuario.data.id,
          descripcion: element.metodo,
          proveedor: element.proveedor,
          numeroCuenta: element.numeroCuenta,
          fechaExpiracion: element.fechaExpiracion
        }
  
        this.gService.create('metodo',metodo).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{})
      });     

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

  listaDirecciones(){
      if (this.direcciones != null) {       
        this.dataSourceDir = new MatTableDataSource(this.direcciones);
      }           
  }

  listaMetodos(){
    if (this.pagos != null) {       
      this.dataSourcePay = new MatTableDataSource(this.pagos);
    }           
  }
}


