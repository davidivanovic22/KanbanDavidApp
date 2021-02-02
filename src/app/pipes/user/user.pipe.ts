import { Pipe, PipeTransform } from '@angular/core';
import { filterUser } from 'src/assets/utils/filter';

@Pipe({
  name: 'userFilter'
})
export class UserPipe implements PipeTransform {

  transform(user: any, args?: any): any {
    user = user.filter((search: any) => {
      return filterUser(search, args);
    });
    return user;
  }

}
