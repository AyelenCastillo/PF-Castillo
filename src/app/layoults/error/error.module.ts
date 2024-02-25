import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../error/error.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class ErrorModule { }
