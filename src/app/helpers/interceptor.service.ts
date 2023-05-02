
  import { Injectable } from '@angular/core';
  import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
  import { catchError, Observable, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
  
  @Injectable({
    providedIn: 'root'
  })

  export class JtwInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      let currentUser = this.userService.currentUserValue;
        if (currentUser && currentUser) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser}`
                }
            });
        }
            
        return next.handle(req).pipe(catchError(err => {
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
    
  }

