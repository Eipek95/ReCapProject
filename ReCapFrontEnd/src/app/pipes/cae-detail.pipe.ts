import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailDto } from '../models/cardetaildto';

@Pipe({
  name: 'caeDetail'
})
export class CaeDetailPipe implements PipeTransform {

  transform(value: CarDetailDto[], filterText:string): CarDetailDto[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
    return filterText?
    value.filter((c:CarDetailDto)=>c.description.toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;
  }

}
