import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPedidoVendedorComponent } from './lista-pedido-vendedor/lista-pedido-vendedor.component';
import { ListaPedidoClienteComponent } from './lista-pedido-cliente/lista-pedido-cliente.component';
import { DetallesPedidoComponent } from './detalles-pedido/detalles-pedido.component';
import { ProcesarComponent } from './procesar/procesar.component';

const routes: Routes = [
  {path:'pedido/lista-vendedor', component: ListaPedidoVendedorComponent},
  {path:'pedido/lista-cliente', component: ListaPedidoClienteComponent},
  {path:'pedido/procesar', component: ProcesarComponent},
  {path:'pedido/:id', component: DetallesPedidoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
