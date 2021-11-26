import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from '../dtos/auth-credentials.dto';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  public async createUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    const { username, password } = authCredentialsDto;

    //salt
    const salt = await bcrypt.genSalt();
    const hasdedPassword = await bcrypt.hash(password, salt);
    const user = this.create({
      username,
      password: hasdedPassword,
    });
    console.log(salt, hasdedPassword);

    try {
      await this.save(user);
      console.log(user);
    } catch (error) {
      //duplicate user
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
