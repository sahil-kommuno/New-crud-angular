import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('loginToken');
    console.log('Api hit start', req.url);
    if (authToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log('Api hit end', req.url);
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          Swal.fire('Login first');
          this.router.navigate(['/adminloginform']);
          console.error('Unauthorized request');
        } else if (error.status === 500) {
          console.error('Server error occurred');
        }
        return throwError(error);
      })
    );
  }
}
