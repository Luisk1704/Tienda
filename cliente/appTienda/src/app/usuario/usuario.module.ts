import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { ListaComponent } from './lista-usuario/lista.component';
import { DetallesComponent } from './detalles-usuario/detalles.component';
import {MatCardModule} from '@angular/material/card';
import { LoginComponent } from './login/login.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatDialogModule} from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../core/header/header.component';



@NgModule({
  declarations: [
    ListaComponent,
    DetallesComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MatTableModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDividerModule, 
    MatDialogModule,
    MatIconModule,
    LayoutModule,
    ReactiveFormsModule
  ],
  exports: [
    DetallesComponent,
    LoginComponent
  ],
  providers: [HeaderComponent],
})

export class UsuarioModule { }
