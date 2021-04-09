import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name:"replice"
  })
  export class ReplacePipe implements PipeTransform{
    transform(value:string) : string{
      let result = value.replace('unsafe:', '');
      console.log(result);
      return result;
    }
  }