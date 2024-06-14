import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { LoadingComponent } from './components/partials/loading/loading.component';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideToastr({
      timeOut:8000,
      positionClass: 'toast-bottom-right',
      newestOnTop:false
    }),
    provideAnimations(), provideAnimationsAsync(),
    
  ],
};
