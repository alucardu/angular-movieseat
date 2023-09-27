import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { ContainerComponent } from './components/UI/container/container.component';
import { GraphQLModule } from './graphql.module';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './utils/CustomRouteReuseStrategy';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    ContainerComponent,
    NgCircleProgressModule.forRoot({}),
    GraphQLModule
  ],
  providers: [
    Title,
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
