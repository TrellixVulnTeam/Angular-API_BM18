import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  //Déclaration de composant
  constructor(private auth: AuthService) { }

  //Envoie/Association d'un Token dans les requètes HTTP
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.auth.token;
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(newRequest);
  }
}