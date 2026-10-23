import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// PrimeNG imports
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Lara from '@primeuix/themes/lara';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './features/auth/interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // Interceptor de autenticación
    provideHttpClient(withInterceptors([AuthInterceptor])),

    provideAnimationsAsync(),
    // PrimeNG configuration
    providePrimeNG({
      theme: {
        preset: Lara,
        options: {
          prefix: 'p',
          darkModeSelector: '.app-dark',
          cssLayer: false,
        },
      },
    }),
  ],
};
