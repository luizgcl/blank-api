import { getSubscriptionTypeQuantityInMonths } from '@/common/constants/subscription-type';
import { CustomerMembers } from '@/customers/entities/customer-members.entity';
import { Customer } from '@/customers/entities/customer.entity';
import { Plan } from '@/customers/entities/plan.entity';
import { Subscription } from '@/customers/entities/subscription.entity';
import { User } from '@/users/entities/user.entity';
import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import * as dayjs from 'dayjs';
import slugify from 'slugify';
import { DataSource, Repository } from 'typeorm';
import { RegisterCustomerDto } from './dto/register-customer.dto';

@Injectable()
export class RegisterCustomerService {
  @InjectRepository(Customer)
  private customerRepository: Repository<Customer>;

  @InjectRepository(Plan)
  private planRepository: Repository<Plan>;

  @InjectRepository(Subscription)
  private subscriptionRepository: Repository<Subscription>;

  @InjectRepository(CustomerMembers)
  private customerMemberRepository: Repository<CustomerMembers>;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectDataSource()
  private dataSource: DataSource;

  async register(registerCustomerDto: RegisterCustomerDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.startTransaction();

    const customerWithSameEmail = await this.customerRepository.findOneBy({
      email: registerCustomerDto.email,
    });

    const customerWithSameDocument = await this.customerRepository.findOneBy({
      document: registerCustomerDto.document,
      documentType: registerCustomerDto.documentType,
    });

    const userWithSameEmail = await this.userRepository.findOneBy({
      email: registerCustomerDto.email,
    });

    if (
      customerWithSameEmail ||
      customerWithSameDocument ||
      userWithSameEmail
    ) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new ConflictException('Cliente já registado no sistema.');
    }

    try {
      const customer = this.customerRepository.create({
        name: registerCustomerDto.name,
        socialName: registerCustomerDto.socialName,
        document: registerCustomerDto.document,
        documentType: registerCustomerDto.documentType,
        email: registerCustomerDto.email,
        phone: registerCustomerDto.phone,
      });

      await queryRunner.manager.save(customer);

      const plan = await this.planRepository.findOne({
        where: {
          id: registerCustomerDto.planId,
        },
      });

      if (!plan) {
        throw new NotFoundException('Plano não encontrado no sistema.');
      }

      const subscriptionMonthsQuantity = getSubscriptionTypeQuantityInMonths(
        registerCustomerDto.subscriptionType,
      );

      const finalPrice = Number(plan.price) * subscriptionMonthsQuantity;

      const installmentValue = finalPrice / registerCustomerDto.installments;

      const expiresAt = dayjs()
        .add(subscriptionMonthsQuantity, 'months')
        .format();

      const subscription = this.subscriptionRepository.create({
        customer,
        finalPrice,
        discount: registerCustomerDto.planDiscount,
        installments: registerCustomerDto.installments,
        installmentValue,
        expiresAt,
        plan,
      });

      await queryRunner.manager.save(subscription);

      const salt = await genSalt();
      const passwordHash = await hash(registerCustomerDto.password, salt);

      const path = slugify(
        `${registerCustomerDto.firstName} ${registerCustomerDto.lastName} ${Date.now()}`,
        {
          lower: true,
          locale: 'pt',
        },
      );

      const user = this.userRepository.create({
        firstName: registerCustomerDto.firstName,
        lastName: registerCustomerDto.lastName,
        email: registerCustomerDto.email,
        picturePath: path,
        passwordHash,
      });

      await queryRunner.manager.save(user);

      const customerMember = this.customerMemberRepository.create({
        customer,
        user,
      });

      await queryRunner.manager.save(customerMember);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      if (err instanceof HttpException) {
        throw err;
      }
    } finally {
      await queryRunner.release();
    }
  }
}
