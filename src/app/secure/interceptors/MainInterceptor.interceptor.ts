import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError, map, EMPTY, Observable, observable } from 'rxjs';
import { environment as env, } from '@env/environment.prod';
import { inject } from '@angular/core';
import { StorageServiceService } from '@services/storage-service.service';

export const MainInterceptor: HttpInterceptorFn = (req, next) => {
  let msgError = '';
  let IsOnline = true;
  verificaConextion().then(
    x => {
      IsOnline = x;
    }
  )
  /*  return next(req).pipe(
     catchError((error: HttpErrorResponse) => {
       console.log('Error Capturado', error);
       if (error.statusText === 'OK' && error.error.error && error.error.error === 'There is nothing here') {
         msgError = "SIN REGISTROS :(";
         alert(msgError);
         let clone = req.clone({ url: env.urlBase + '/character' });
         return next(clone);
       }
       else if (error.statusText === 'Unknown Error') {
         msgError = `Error desconocido. Posible problema interno`;
       }
       else {
         console.warn(error);
         msgError = `Error Generico: ${error.message}! `;
       }
       console.log('MSGE GENERADO>>>:::', msgError);
       alert(msgError);
       return throwError(() => msgError);
     })
   ); */
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('Error Capturado', error)
      if (!IsOnline) {
        msgError = "No hay conexion a internet :(";
        alert(msgError);
      }
      else if (error.statusText === 'OK' && error.error.error && error.error.error === 'There is nothing here') {
        msgError = "SIN REGISTROS :(";
        alert(msgError);
        let clone = req.clone({ url: env.urlBase + '/character' });
        return next(clone);
      }
      else if (error.statusText === 'Unknown Error') {
        msgError = `Error desconocido. Posible problema interno`;
      }
      else {
        console.warn(error);
        msgError = `Error Generico: ${error.message}! `;
      }
      console.log('MSGE GENERADO>>>:::', msgError);
      alert(msgError);
      return throwError(() => msgError);
    })
  );;
};
export async function verificaConextion() {
  let Online = true;
  let storageServ = inject(StorageServiceService);
  await storageServ.getNetworkValue().then(x => Online = x);
  return Online;
}
