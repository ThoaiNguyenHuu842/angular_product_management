import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(appRoutes), provideAnimations(), 
    {provide: MatDialogRef,useValue: {}},
    {provide: MAT_DIALOG_DATA,useValue: {}}
  ],
};
