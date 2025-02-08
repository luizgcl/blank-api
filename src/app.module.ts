import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        autoLoadEntities: true,
        migrations: ['.src/**/migrations/*.ts'],
        synchronize: false,
        cache: {
          type: 'redis',
          duration: 30000,
          options: {
            host: '127.0.0.1',
            port: 6379,
            password: 'docker',
          },
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    CommonModule,
    CustomersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
