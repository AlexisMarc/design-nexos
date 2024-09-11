import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { RootStore } from '@store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withHashLocation(),
      withComponentInputBinding()
    ),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore(RootStore),
    provideStoreDevtools({
      maxAge: 25,
      //logOnly: environment.production
    }),
  ],
};
