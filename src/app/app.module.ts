import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieDashboardModule } from './components/features/movieDashboard/movie-dashboard.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MovieDashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
