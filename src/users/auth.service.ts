import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
const scrypt = promisify(_scrypt);

export
@Injectable()
class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: string) {
    const existingUser = await this.userService.find(email);
    if (existingUser) {
      throw new BadRequestException('this email is exist ');
    }
    //genreate salt
    const salt = randomBytes(8).toString('hex');
    //hash the password and the salt together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    //join hashd result and salut
    const result = salt + '.' + hash.toString('hex');
    //create new user
    const newUser = this.userService.createUser(email, password);
    return newUser;
  }
  async signIn(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('user not found , signUp');
    }
    const [salt, oldHash] = user.password.split('.');
    //hash entered password to compare it by the old result
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    //comparing bt oldHashed and hash
    if (oldHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong Password');
    }
  }
}
