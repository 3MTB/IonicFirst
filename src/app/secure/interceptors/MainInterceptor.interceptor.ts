import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError, map } from 'rxjs';

export const MainInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('Error Capturado', error);
      let msgError = '';
      if (error.statusText === 'OK' && error.error.error && error.error.error === 'There is nothing here') {
        msgError = "SIN REGISTROS :(";
      }
      else if (error.statusText === 'Unknown Error') {
        msgError = `Error desconocido. Posible problema interno`;
      }
      else {
        console.log(error);
        msgError = `Error Generico: ${error.message}! `;
      }
      console.log('MSGE GENERADO>>>:::', msgError);
      alert(msgError);
      return throwError(() => msgError);
    })
  )
    ;
};
