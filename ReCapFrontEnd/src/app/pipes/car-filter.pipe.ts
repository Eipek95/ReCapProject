import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';
import { Car } from '../models/car';
import { Cbrand } from '../models/cbrand';

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: Brand[], filterText:string): Brand[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
    return filterText?
    value.filter((c:Brand)=>c.name.toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;
  }

}
