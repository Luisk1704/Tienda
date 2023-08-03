import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista-ropa-vendedor/lista.component';
import { DetallesComponent } from './detalles-ropa/detalles.component';
import { ListaRopaclienteComponent } from './lista-ropacliente/lista-ropacliente.component';
import { CrearRopaComponent } from './crear-ropa/crear-ropa.component';
import { AuthGuard } from '../share/guards/auth.guard';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { RespuestasComponent } from './respuestas/respuestas.component';

const routes: Routes = [
  {path:'ropa/lista-vendedor', component: ListaComponent,
  canActivate:[AuthGuard],
    data:{
      roles: ['VENDEDOR']
    }
  },

  {path:'ropa/lista-cliente', component: ListaRopaclienteComponent,
  canActivate:[AuthGuard],
    data:{
      roles: ['CLIENTE']
    }
  },

  {path:'ropa/crear-ropa', component: CrearRopaComponent,
  data:{
    roles: ['VENDEDOR']
  }
  },

  {path:'ropa/crear-ropa/:id', component: CrearRopaComponent,
  data:{
    roles: ['VENDEDOR']
  }
  },

  {path:'ropa/preguntas/:id', component: PreguntasComponent,
    canActivate:[AuthGuard],
      data:{
      roles: ['CLIENTE']
    }
  },

  {path:'ropa/respuestas/:id', component: RespuestasComponent,
    canActivate:[AuthGuard],
      data:{
      roles: ['VENDEDOR']
    }
  },

  {path:'ropa/:id', component: DetallesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
