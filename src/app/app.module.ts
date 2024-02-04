import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './layoults/dashboard/dashboard.module';
import es from "@angular/common/locales/es";
import { registerLocaleData } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CursosModule } from './layoults/dashboard/pages/cursos/cursos.module';
import { AppRoutingModule } from './app-routing.module';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DashboardModule,
    CursosModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: "es-AR"
  }, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
