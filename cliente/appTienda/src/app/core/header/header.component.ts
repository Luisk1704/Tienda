import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

@Injectable({
  providedIn: 'root', // modulo específico
})


export class HeaderComponent implements OnInit{
  cantProd:number = 0
  isAutenticated: boolean;
  currentUser: any;
  isAdmin:boolean = false
  isVend:boolean = false
  isClient:boolean = false
  authenticated: boolean = false
  
  constructor(private cartService:CartService,
    private router: Router,
    private authService: AuthenticationService,
    private http: HttpClient) {
      this.cantProd=this.cartService.quantityItems()
  }  

  refrescar(){
    window.location.reload()
  }

  ngOnInit(): void {
    this.cartService.countItems.subscribe((value)=>{
      this.cantProd=value
     })  
     this.authService.currentUser.subscribe((x)=>{this.currentUser=x;
      if (this.currentUser == null) {
        this.authenticated = false
        this.isClient = false
        this.isAdmin = false
        this.isVend = false
       } else if (this.currentUser.user.rol == 'ADMINISTRADOR') {
        this.authenticated = true
        this.isClient = false
        this.isAdmin = true
        this.isVend = false
       } else if (this.currentUser.user.rol == 'VENDEDOR') {
        this.authenticated = true
        this.isClient = false
        this.isAdmin = false
        this.isVend = true
       } else if (this.currentUser.user.rol == 'CLIENTE') {
        this.authenticated = true
        this.isClient = true
        this.isAdmin = false
        this.isVend = false
       }
    });
     
     //Subscripción al boolean que indica si esta autenticado
     this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));     
    //Suscribirse al observable que gestiona la cantidad de items del carrito    
  }

  login(){
    this.router.navigate(['usuario/login']);
  }
  logout(){
    this.authService.logout();
    this.authService.currentUser.subscribe((x)=>{this.currentUser=x;
      if (this.currentUser == null) {
        this.authenticated = false
        this.isClient = true
        this.isAdmin = false
        this.isVend = false
       } else if (this.currentUser.user.rol == 'ADMINISTRADOR') {
        this.authenticated = true
        this.isClient = false
        this.isAdmin = true
        this.isVend = false
       } else if (this.currentUser.user.rol == 'VENDEDOR') {
        this.authenticated = true
        this.isClient = false
        this.isAdmin = false
        this.isVend = true
       } else if (this.currentUser.user.rol == 'CLIENTE') {
        this.authenticated = true
        this.isClient = true
        this.isAdmin = false
        this.isVend = false
       }
    });     
    this.router.navigate(['usuario/login']);
  }
}
