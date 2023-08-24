import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPedidoVendedorComponent } from './lista-pedido-vendedor/lista-pedido-vendedor.component';
import { ListaPedidoClienteComponent } from './lista-pedido-cliente/lista-pedido-cliente.component';
import { DetallesPedidoComponent } from './detalles-pedido/detalles-pedido.component';
import { ProcesarComponent } from './procesar/procesar.component';
import { AuthGuard } from '../share/guards/auth.guard';
import { ReportePdfComponent } from './reporte-pdf/reporte-pdf.component';
import { ReporteGraficoComponent } from './reporte-grafico/reporte-grafico.component';

const routes: Routes = [
  {path:'pedido/lista-vendedor', component: ListaPedidoVendedorComponent,
    canActivate:[AuthGuard],
      data:{
      roles: ['VENDEDOR']
    }
  },
  {path:'pedido/reporte-pdf', component: ReportePdfComponent,
    canActivate:[AuthGuard],
      data:{
      roles: ['VENDEDOR']
    }
  },
  {path:'pedido/reporte-grafico', component: ReporteGraficoComponent,
    canActivate:[AuthGuard],
      data:{
      roles: ['VENDEDOR','ADMINISTRADOR']
    }
  },
  {path:'pedido/lista-cliente', component: ListaPedidoClienteComponent,
    canActivate:[AuthGuard],
      data:{
      roles: ['CLIENTE']
    }
  },
  {path:'pedido/procesar', component: ProcesarComponent,
    canActivate:[AuthGuard],
      data:{
      roles: ['CLIENTE']
    }
  },
  {path:'pedido/:id', component: DetallesPedidoComponent,
    canActivate:[AuthGuard],
    data:{
      roles: ['CLIENTE']
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
