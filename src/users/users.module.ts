import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule, AuthModule],
  exports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
