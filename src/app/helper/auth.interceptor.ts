import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { TokenStorageService } from '../service/token-storage.service';

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

 constructor(
  private token: TokenStorageService,
  private router: Router
 ){}

 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  let authReq = req;
  const token = this.token.getToken();
  if (token !== null) {
   authReq = req.clone({
    headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer' + token)
   });
  }

  return next.handle(authReq);
 }
}

export const authInterceptorProviders = [
 { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]