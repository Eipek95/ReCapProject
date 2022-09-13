import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

   transform(value: any[],filterText:string): any[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
    return filterText?
    value.filter((c:any)=>c.carName.toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;
  }
}

  
