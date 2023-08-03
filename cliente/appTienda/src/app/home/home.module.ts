import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import {MatCardModule} from '@angular/material/card';
import { AutenticarComponent } from './autenticar/autenticar.component'; 


@NgModule({
  declarations: [
    InicioComponent,
    AcercaDeComponent,
    AutenticarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule
  ],
  exports: [
    AutenticarComponent
  ]
})
export class HomeModule { }
