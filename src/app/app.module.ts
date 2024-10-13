import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { ContainerComponent } from './components/UI/container/container.component';
import { GraphQLModule } from './graphql.module';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './utils/CustomRouteReuseStrategy';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

@NgModule({ declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        ContainerComponent,
        NgCircleProgressModule.forRoot({}),
        GraphQLModule], providers: [
        Title,
        {
            provide: RouteReuseStrategy,
            useClass: CustomRouteReuseStrategy,
        },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { verticalPosition: 'top' } },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {}
