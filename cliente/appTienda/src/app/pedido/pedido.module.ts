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

@NgModule({
  declarations: [  
    ListaPedidoVendedorComponent, ListaPedidoClienteComponent, DetallesPedidoComponent
  ],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule
  ],
  exports: [
  
    ListaPedidoVendedorComponent,
       ListaPedidoClienteComponent,
       DetallesPedidoComponent
  ]
})
export class PedidoModule { }
