import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';
import { Car } from '../models/car';
import { CarDetailDto } from '../models/cardetaildto';
import { Color } from '../models/color';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

   transform(value: any[],filterText:string): any[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
    return filterText?
    value.filter((c:CarDetailDto)=>c.brandName.toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;
  }
}

  
