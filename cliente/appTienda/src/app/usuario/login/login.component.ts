import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { HeaderComponent } from 'src/app/core/header/header.component';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  hide=true;
  formulario: FormGroup;
  makeSubmit: boolean = false;
  infoUsuario: any;
  isAutenticated: boolean;
  currentUser: any;
  isAdmin:boolean = false
  isVend:boolean = false
  isClient:boolean = false
  header: HeaderComponent
  
  constructor(private gService: GenericService,
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute,
    private hd: HeaderComponent
  ) {
    this.reactiveForm();
  }
  // Definir el formulario con su reglas de validación
  reactiveForm() {
    this.formulario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenna: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mensajes();
  }

  mensajes() {
   let register=false;
   let auth='';
   //Obtener parámetros de la URL
   this.route.queryParams.subscribe((params)=>{
    register=params['register']==='true' || false;
    auth=params['auth'] || '';
    if(register){
      this.notificacion.mensaje(
        'Usuario',
        'Usuario registrado! Especifique sus credenciales',
        TipoMessage.success
      )
    }
    if(auth){
      this.notificacion.mensaje(
        'Usuario',
        'Acceso denegado',
        TipoMessage.warning
      )
    }
   })
   
  }

  registrarse(){
    this.router.navigate(['usuario/registrarse']);
  }

  onReset() {
    this.formulario.reset();
  }
  submitForm() {
    this.makeSubmit=true;
    //Validación
    if(this.formulario.invalid){
     return;
    }
    this.authService.loginUser(this.formulario.value)    
    .subscribe((respuesta:any)=>{
      console.log(respuesta)
      if (respuesta == null) {
        this.router.navigate(['usuario/login']);
        return        
      }
      this.router.navigate(['/']);
    })
  }
  /* Manejar errores de formulario en Angular */

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };
}
