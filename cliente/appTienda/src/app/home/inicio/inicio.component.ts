import { Component, OnInit, AfterViewInit} from '@angular/core';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{
  auth: AuthenticationService
  currentUser:any
  constructor(private authService: AuthenticationService) {
    
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));   
  }

  refrescar(){
    
  }
}
