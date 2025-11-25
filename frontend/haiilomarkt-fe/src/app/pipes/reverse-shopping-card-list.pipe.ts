import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseShoppingCartList',
  standalone: true,
})
export class ReverseShoppingCartListPipe implements PipeTransform {
  transform(value: any[] | null): any[] | null {
    if (!Array.isArray(value)) return value;
    return [...value].reverse();
  }
}
