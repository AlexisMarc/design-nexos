import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation, withInMemoryScrolling, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
      withRouterConfig({paramsInheritanceStrategy: 'always'}),
      withInMemoryScrolling({scrollPositionRestoration: "enabled"}),
      withHashLocation(),
      withComponentInputBinding(),
    ), provideAnimationsAsync(),
  ],
};
