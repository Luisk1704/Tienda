import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPedidoVendedorComponent } from './lista-pedido-vendedor/lista-pedido-vendedor.component';
import { ListaPedidoClienteComponent } from './lista-pedido-cliente/lista-pedido-cliente.component';
import { DetallesPedidoComponent } from './detalles-pedido/detalles-pedido.component';

const routes: Routes = [
  {path:'pedido/lista-vendedor', component: ListaPedidoVendedorComponent},
  {path:'pedido/lista-cliente', component: ListaPedidoClienteComponent},
  {path:'pedido/:id', component: DetallesPedidoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
