import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { ListaComponent } from './lista-usuario/lista.component';
import { DetallesComponent } from './detalles-usuario/detalles.component';
import {MatCardModule} from '@angular/material/card'; 



@NgModule({
  declarations: [
    ListaComponent,
    DetallesComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MatTableModule,
    MatCardModule
  ],
  exports: [
    DetallesComponent
  ]
})
export class UsuarioModule { }
