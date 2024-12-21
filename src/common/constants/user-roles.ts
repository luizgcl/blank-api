export enum UserRole {
  SYSADMIN = 'SYSADMIN',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export type UserRoleType = keyof typeof UserRole;

export const UserRoles = Object.values(UserRole) as UserRole[];

export const DefaultUserRole = UserRole.EMPLOYEE;
