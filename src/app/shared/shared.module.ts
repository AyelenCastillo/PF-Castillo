import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './full-name.pipe';
import { SizeTitleDirective } from './size-title.directive';



@NgModule({
  declarations: [
    FullNamePipe,
    SizeTitleDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FullNamePipe,
    SizeTitleDirective,
  ]
})
export class SharedModule { }
