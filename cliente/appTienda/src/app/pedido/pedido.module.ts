import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoRoutingModule } from './pedido-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { ListaPedidoVendedorComponent } from './lista-pedido-vendedor/lista-pedido-vendedor.component';
import { ListaPedidoClienteComponent } from './lista-pedido-cliente/lista-pedido-cliente.component';
import { DetallesPedidoComponent } from './detalles-pedido/detalles-pedido.component';
import { ProcesarComponent } from './procesar/procesar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; 

@NgModule({
  declarations: [  
    ListaPedidoVendedorComponent, ListaPedidoClienteComponent, DetallesPedidoComponent, ProcesarComponent
  ],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
  
    ListaPedidoVendedorComponent,
       ListaPedidoClienteComponent,
       DetallesPedidoComponent,
       ProcesarComponent
  ]
})
export class PedidoModule { }
