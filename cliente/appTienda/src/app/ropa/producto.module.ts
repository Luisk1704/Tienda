import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card'; 
import { ProductoRoutingModule } from './producto-routing.module';
import { ListaComponent } from './lista-ropa-vendedor/lista.component';
import { DetallesComponent } from './detalles-ropa/detalles.component';
import { MatTableModule } from '@angular/material/table';
import {formatCurrency, getCurrencySymbol} from '@angular/common';
import { ListaRopaclienteComponent } from './lista-ropacliente/lista-ropacliente.component';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { CrearRopaComponent } from './crear-ropa/crear-ropa.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { RespuestasComponent } from './respuestas/respuestas.component';


@NgModule({
  declarations: [
    ListaComponent,
    DetallesComponent,
    ListaRopaclienteComponent,
    CrearRopaComponent,
    PreguntasComponent,
    RespuestasComponent,
    
  ],

  imports: [
    CommonModule,
    ProductoRoutingModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,    
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,    
  ],
  exports: [
    ListaComponent,
    DetallesComponent,
    ListaRopaclienteComponent,
    CrearRopaComponent,
    PreguntasComponent,
    RespuestasComponent
  ]
})
export class ProductoModule { }
