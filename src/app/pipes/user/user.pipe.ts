import { Pipe, PipeTransform } from '@angular/core';
import { filterUser } from 'src/assets/utils/filter';

@Pipe({
  name: 'userFilter'
})
export class UserPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(args);

    value = value.filter(function(search: any) {
      return filterUser(search, args);
    });
    return value;
  }

}
