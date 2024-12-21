import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(data: CreateUserDto) {
    const userWithSameEmail = await this.userRepository.findOneBy({
      email: data.email,
    });

    if (userWithSameEmail) {
      throw new ConflictException('Usuário já registrado');
    }

    await this.userRepository.save({
      ...data,
      role: data.role || 'EMPLOYEE',
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({
      id,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
  }
}
