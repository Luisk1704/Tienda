import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, buffer, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit{
  pregForm: FormGroup;
  submitted: boolean;
  currentUser: any
  destroy$: Subject<boolean> = new Subject<boolean>();
  respPreg: any
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
    console.log(this.route)
  }

  formularioReactive() {
    //[null, Validators.required]
    this.pregForm=this.fb.group({
      id:[null,null],
      usuarioId: [null,null],
      descripcion:[null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])],
      ropaId: [null, null]            
    })    
  }

  crearPregunta(): void {
    //Establecer submit verdadero
    this.submitted = true;
    console.log(this.pregForm)
    //Verificar validación
    if(this.pregForm.invalid){
      return;
    }
    
    this.pregForm.value.usuarioId = this.currentUser.user.id
    this.pregForm.value.ropaId = this.id
    this.gService.create('pregunta',this.pregForm.value).pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      //Obtener respuesta
      this.respPreg = data;
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
      this.router.navigate(['/ropa/lista-cliente'],{
        queryParams: {create:'true'}
      });        
    }) 
  }
  
  public errorHandling = (control: string, error: string) => {
    return this.pregForm.controls[control].hasError(error);
  };
}
