import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { UsersModule } from './pages/users/users.module';
import { PipesModule } from './pages/pipes/pipes.module';
import { HomeModule } from './pages/home/home.module';
import { CursosModule } from './pages/cursos/cursos.module';
import { InscripcionesModule } from './pages/inscripciones/inscripciones.module';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { InscripcionesComponent } from './pages/inscripciones/inscripciones.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    UsersModule,
    PipesModule,
    HomeModule,
    CursosModule,
    InscripcionesModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: 'users',
            component: UsersComponent,
            pathMatch: 'full',
          },
          {
            path: 'cursos',
            component: CursosComponent,
            pathMatch: 'full',
          },
          {
            path: 'inscripciones',
            component: InscripcionesComponent,
            pathMatch: 'full',
          },
          {
            path:'',
            component: HomeComponent,
            pathMatch: 'full',
          },
        ],
      },
    ]),
  ],
  exports: [
    DashboardComponent,
  ],
})
export class DashboardModule { }