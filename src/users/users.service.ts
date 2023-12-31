import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}
  // create new user
  createUser(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }
  //find user by id
  async findOne(id: number) {
    const user = await this.repo.findBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
  // get All users by email
  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async updateUser(id: number, attrs: Partial<User>) {
    const user = await this.repo.findBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, attrs);

    return this.repo.save(user);
  }
  async removeUser(id: number) {
    const user = await this.repo.findBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user);

    return this.repo.remove(user);
  }
}
