import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista-usuario/lista.component';
import { DetallesComponent } from './detalles-usuario/detalles.component';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { AuthGuard } from '../share/guards/auth.guard';

const routes: Routes = [

  {path:'usuario/lista', component: ListaComponent,
    canActivate:[AuthGuard],
      data:{
      roles: ['ADMINISTRADOR']
    }
  },

  {path:'usuario/registrarse', component: RegistrarComponent},

  {path:'usuario/login', component: LoginComponent},

  {path:'usuario/:id', component: DetallesComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
