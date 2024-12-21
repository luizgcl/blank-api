import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/common/constants/user-roles';

export const Roles = (...args: UserRole[]) => SetMetadata('roles', args);
