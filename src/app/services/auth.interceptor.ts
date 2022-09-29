import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');

    if (token == null) {
      return next.handle(request);
    }

    const headers = new HttpHeaders({
      Authorization:  `Bearer ${token}`
    });

    const reqClone = request.clone({
      headers
    });
    
    return next.handle(reqClone)
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            this.authService.logout();
          }
          return throwError(err);
        })
      )
  }
}
