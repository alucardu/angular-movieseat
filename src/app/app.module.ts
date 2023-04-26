import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieDashboardModule } from './components/features/movie-dashboard/movie-dashboard.module';
import { MaterialModule } from './material.module';
import { DrawerComponent } from './components/UI/drawer/drawer.component';
import { NavigateBackComponent } from './components/UI/navigate-back/navigate-back.component'
import { DrawerMenuComponent } from './components/UI/drawer-menu/drawer-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawerComponent,
    DrawerMenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    MovieDashboardModule,
    NavigateBackComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
