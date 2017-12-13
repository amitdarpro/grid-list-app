import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, size = 50): string {
    if (value.length > size) {
      let str =  value.substr(0, size);
      return str.substr(0, str.lastIndexOf(" ")) + " ...";
    }
    return value;
  }
}