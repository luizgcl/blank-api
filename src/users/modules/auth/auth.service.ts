import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { DefaultUserRole } from 'src/common/constants/user-roles';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InputLoginDto, OutputLoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject()
  private jwtService: JwtService;

  async register(data: CreateUserDto) {
    const userWithSameEmail = await this.userRepository.findOneBy({
      email: data.email,
    });

    if (userWithSameEmail) {
      throw new ConflictException('Usuário já registrado no sistema');
    }

    const salt = await genSalt();
    const passwordHash = await hash(data.password, salt);

    await this.userRepository.save({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash,
      role: data.role || DefaultUserRole,
    });
  }

  async login(data: InputLoginDto): Promise<OutputLoginDto> {
    const user = await this.userRepository.findOneBy({
      email: data.email,
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isSamePassword = await compare(data.password, user.passwordHash);

    if (!isSamePassword) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const accessToken = this.jwtService.sign(
      {
        role: user.role,
      },
      {
        subject: user.email,
      },
    );

    return {
      access_token: accessToken,
    };
  }

  async profile(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    return user;
  }
}
