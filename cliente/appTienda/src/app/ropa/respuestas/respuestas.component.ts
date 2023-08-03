import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css']
})
export class RespuestasComponent implements OnInit{
  respForm: FormGroup;
  submitted: boolean;
  currentUser: any
  destroy$: Subject<boolean> = new Subject<boolean>();
  respResp: any
  id:number

  constructor(private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService) {    
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.formularioReactive();
  }
  
  ngOnInit(): void {
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    console.log(this.route.url[2])
  }

  formularioReactive() {
    //[null, Validators.required]
    this.respForm=this.fb.group({
      id:[null,null],
      usuarioId: [null,null],
      descripcion:[null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])],
      preguntaId: [null, null]            
    })  
  }

  crearRespuesta(): void {
    //Establecer submit verdadero
    this.submitted = true;
    console.log(this.respForm)
    //Verificar validación
    if(this.respForm.invalid){
      return;
    }
    
    this.respForm.value.usuarioId = this.currentUser.user.id
    this.respForm.value.preguntaId = this.id
    this.gService.create('respuesta',this.respForm.value).pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      //Obtener respuesta
      this.respResp = data;
      /*let foto = {
        id: this.respRopa.id,
        foto2: this.fotoselec2
      }
      
      console.log(this.ropaForm)
            
      this.gService.create('foto',this.ropaForm)
      .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respFoto = data;     
      })   */
      this.router.navigate(['/ropa/lista-vendedor'],{
        queryParams: {create:'true'}
      });        
    }) 
  }
  
  public errorHandling = (control: string, error: string) => {
    return this.respForm.controls[control].hasError(error);
  };
}


