import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appSizeTitle]'
})
export class SizeTitleDirective implements AfterViewInit {

  constructor(private el: ElementRef) { 
  }
  ngAfterViewInit(): void {
    this.adjustFontSize();
  }

  private adjustFontSize(): void {
    this.el.nativeElement.style.fontSize = "20px";
  }

}
