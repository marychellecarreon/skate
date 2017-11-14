import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortAddress',
})
export class ShortAddressPipe implements PipeTransform {
  transform(value: string, ...args) {
    return value.replace(/ \d*,.*$/, '');
  }
}
