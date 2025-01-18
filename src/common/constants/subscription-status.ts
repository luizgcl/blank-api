export enum SubscriptionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  EXPIRED = 'EXPIRED',
  INACTIVE = 'INACTIVE',
}

export type SubscriptionStatusType = keyof typeof SubscriptionStatus;

export const SubscriptionStatusArray = Object.values(
  SubscriptionStatus,
) as SubscriptionStatusType[];

export const DefaultSubscriptionStatus = SubscriptionStatus.PENDING;
