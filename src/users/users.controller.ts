import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUsertDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/user-update.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.inerceptors';
import { AuthService } from './auth.service';

@Controller('auth')
@UseInterceptors(SerializeInterceptor)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('/signup')
  async createUser(@Body() body: CreateUsertDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @Post('/signin')
  async signIn(@Body() body: CreateUsertDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    //session.userId = user.id;
    return user;
  }
  @Get('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }
  @Get('/whoami')
  whoAmI(@Session() session: any) {
    return this.userService.findOne(session.userId);
  }
  @Get('/:id')
  findUser(@Param('id') id: string) {
    this.userService.findOne(parseInt(id));
  }
  @Get()
  findAllUsers(@Query('email') email: string) {
    this.userService.find(email);
  }
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    this.userService.removeUser(parseInt(id));
  }
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    this.userService.updateUser(parseInt(id), body);
  }
}
