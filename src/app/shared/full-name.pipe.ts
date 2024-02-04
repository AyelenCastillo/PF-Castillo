import { Pipe, PipeTransform } from '@angular/core';

interface MyElement {
  firstName: string;
  lastName: string;
}

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
  transform(element: MyElement): string {
    if (!element || typeof element.firstName !== 'string' || typeof element.lastName !== 'string') {
      return "";
    }
    return `${element.firstName} ${element.lastName}`;
  }
}