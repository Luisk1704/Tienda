import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista-ropa-vendedor/lista.component';
import { DetallesComponent } from './detalles-ropa/detalles.component';
import { ListaRopaclienteComponent } from './lista-ropacliente/lista-ropacliente.component';

const routes: Routes = [
  {path:'ropa/lista-vendedor', component: ListaComponent},

  {path:'ropa/lista-cliente', component: ListaRopaclienteComponent},

  {path:'ropa/:id', component: DetallesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
