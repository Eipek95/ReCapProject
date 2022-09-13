import { Pipe, PipeTransform } from '@angular/core';
import { Cbrand } from '../models/cbrand';

@Pipe({
  name: 'brandFilter'
})
export class BrandFilterPipe implements PipeTransform {

  transform(value: Cbrand[], filterText:string): Cbrand[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
    return filterText?
    value.filter((c:Cbrand)=>c.carName.toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;

}
}