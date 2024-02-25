import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardModule } from './layoults/dashboard/dashboard.module';
import es from "@angular/common/locales/es";
import { CommonModule, registerLocaleData } from '@angular/common';
import { CursosModule } from './layoults/dashboard/pages/cursos/cursos.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DashboardRoutingModule } from './layoults/dashboard/dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { cursosReducer } from './store/cursos/cursos.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CursosEffects } from './layoults/dashboard/pages/cursos/cursos.effects';
import { MatCardModule } from '@angular/material/card';
import { AuthModule } from './layoults/auth/auth.module';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardModule,
    CursosModule,
    AuthModule,
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,
    DashboardRoutingModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([CursosEffects]),
    StoreModule.forRoot({ courses: cursosReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-AR',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
