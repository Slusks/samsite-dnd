import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newline'
})
export class NewlinePipe implements PipeTransform {

  transform(string: string): any {

    let newString = string.replace('\n', '<br>')

    return newString;
  }

}
