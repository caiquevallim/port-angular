import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Toaster} from 'ngx-toast-notifications';
import {CryptService} from './crypt.service';



@Injectable()
// @ts-ignore
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toaster: Toaster,
    private cryptService: CryptService,
  ) {
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const t = sessionStorage.getItem('token');
    const dupReq = req.clone({
      headers: req.headers.set('Authorization', `Token ${this.cryptService.decrypt(t)}`),
    });
    return next.handle(dupReq).pipe( tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.toaster.open({
            text: 'Erro de Servidor',
            caption: `Oops!`,
            type: 'danger',
            position: 'top-right'
          });
          // this.router.navigate(['/login']);
        }
      }));
  }
}
