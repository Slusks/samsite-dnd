import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cantrip'
})
export class CantripPipe implements PipeTransform {

  transform(level: number): any {
    if (level == 0){
      return "Cantrip"
    } else {return level}
  }

}
