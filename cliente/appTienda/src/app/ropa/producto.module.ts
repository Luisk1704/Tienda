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


@NgModule({
  declarations: [
    ListaComponent,
    DetallesComponent,
    ListaRopaclienteComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule    
  ],
  exports: [
    ListaComponent,
    DetallesComponent,
    ListaRopaclienteComponent
  ]
})
export class ProductoModule { }
