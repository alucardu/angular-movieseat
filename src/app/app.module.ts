import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieDashboardModule } from './components/features/movieDashboard/movie-dashboard.module';
import { MaterialModule } from './material.module';
import { DrawerComponent } from './components/UI/drawer/drawer.component';

@NgModule({
  declarations: [AppComponent, DrawerComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule, AppRoutingModule, MovieDashboardModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
