import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeHtml'
})
export class RemoveHtmlPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value? value.replace(/\<br\>/g, ' ').replace(/\<.*?\>/g, '') : value;
  }

}
