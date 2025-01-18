export enum MemberStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}

export type MemberStatusType = keyof typeof MemberStatus;

export const MemberStatusArray = Object.values(
  MemberStatus,
) as MemberStatusType[];

export const DefaultMemberStatus = MemberStatus.ACTIVE;
