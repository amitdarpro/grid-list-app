import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(filterObj: any, filterValue: string, propName='title'): any {
    if (filterObj.length === 0 || filterValue === '') {
      return filterObj;
    }
    const resultArray = [];
    for (const item of filterObj) {
      if (item[propName] && item[propName].toLowerCase().indexOf(filterValue.toLowerCase()) !== -1) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
