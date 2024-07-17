import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {  provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { routes } from '../app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync(),
  ]
};
