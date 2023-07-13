import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { ProductoModule } from './ropa/producto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { PedidoModule } from './pedido/pedido.module'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,    
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CoreModule,
    ShareModule,
    HomeModule,
    UsuarioModule,
    ProductoModule,
    PedidoModule, 
    HttpClientModule,
    MatTableModule,   
    AppRoutingModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
