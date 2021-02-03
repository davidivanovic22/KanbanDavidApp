import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { SnackbarService } from '../snackbar/snackbar-handler';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private snackService: SnackbarService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isApiUrl = request.url.startsWith(environment.baseUrl);
    if (isApiUrl && this.authenticationService.userJwtToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authenticationService.userJwtToken}`,
        },
      });
    }
    return next.handle(request).pipe(
      tap(succ => {
        // 
        const status = (succ as any).status;
        if (status && status === 200 && !request.url.includes('login')) {
          switch (request.method) {
            case 'POST':
              this.snackService.showSuccessSnackbar('Succes save!');
              break;
            case 'PUT':
            case 'PATCH':
              this.snackService.showSuccessSnackbar('Succes edit!');
              break;
            case 'DELETE':
              this.snackService.showSuccessSnackbar('Succes delete!');
              break;
          }
        }
      }, error => {


        if (error.status === 401 || error.status === 403) {
          this.authenticationService.logout();
        }
        if (error.status === 0) {
          this.snackService.showErrorSnackbar('The server is currently unavailable, please try again later!');
        } else {
          this.snackService.showErrorSnackbar(error.error.exception || error.error.error || error.error);
        }
      }),
    );
  }
}
