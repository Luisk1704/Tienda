import { Injectable, OnInit } from '@angular/core';
import { 
  HttpEvent, HttpRequest, HttpHandler, 
  HttpInterceptor, HttpErrorResponse 
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { NotificacionService, TipoMessage } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptorService implements HttpInterceptor, OnInit{
  //Recuerde que es necesario llamarlo como Proveedor
  //en AppModule
  public Request: any
  currentUser:any
  constructor(
    private auth: AuthenticationService,
    private noti: NotificacionService,    
  ) {
    this.currentUser = auth.currentUserValue
  }

  ngOnInit(): void {
    this.auth.currentUser.subscribe((x)=>(this.currentUser=x));
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Obtener token
    let token = null;
    if (this.auth.currentUserValue != null) {
      token = this.auth.currentUserValue.token;
    }
    //Agregar headers a la solicitud
    if (token) {
      //Header con el token
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
      this.Request = this.currentUser
    }
    //Opcional indicar el tipo de contenido JSON
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    //Capturar el error
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let message: string = null;
        //Códigos de estado HTTP con su respectivo mensaje
        console.log(request)
        switch (error.status) {
          case 400:
            message = 'Solicitud incorrecta';
            break;
          case 401:
            message = 'No autorizado';
            
            break;
          case 403:
            message = 'Acceso denegado';            
            break;
          case 422:
            message = 'Se ha presentado un error';
            break;
        }
        //Mostrar un mensaje de error
        this.noti.mensaje('Error',error.status+' '+ message,TipoMessage.error);
        throw new Error(error.message+''+request.headers);
      })
      );
    }
  }
