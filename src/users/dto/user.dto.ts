//this class is for converting data comeing from handler inceptors as instance

import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;


}
