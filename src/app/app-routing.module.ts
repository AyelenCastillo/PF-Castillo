import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layoults/dashboard/dashboard.component';
import { LoginComponent } from './layoults/auth/pages/login/login.component';
import { ErrorComponent } from './layoults/error/error.component';


const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', loadChildren: () => import('./layoults/dashboard/dashboard.module').then((m) => m.DashboardModule) }
    ]
  },
  {
    path:'auth', component: LoginComponent,
  },
  {
    path:'404',  component: ErrorComponent,
  },
  
  {
    path:'', redirectTo:'dashboard', pathMatch:'prefix', 
  },
  {
    path:'**', redirectTo:'404',
  },
];

@NgModule({  
    
imports: [RouterModule.forRoot(routes)], 
exports: [RouterModule]})

export class AppRoutingModule { }