import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { finalize, switchMap, tap, timer } from 'rxjs';


export const loadingInterceptor: HttpInterceptorFn = (
  req:HttpRequest<unknown>,
  next:HttpHandlerFn
) => {
  const loadingService = inject(LoadingService);
  const delayBeforeLoading = 500;

  const delayedLoading = timer(delayBeforeLoading).pipe(
    tap(() => loadingService.showLoading())
  )

  const request = next(req).pipe(
    finalize(() => loadingService.hideLoading())
  );

  const response = delayedLoading.pipe(
    switchMap(() => request)
  )
  
  return timer(delayBeforeLoading).pipe(
    switchMap(() => response)
  )
};
