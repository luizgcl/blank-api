export enum SubscriptionType {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  BIANNUAL = 'BIANNUAL',
  YEARLY = 'YEARLY',
}

export type SubscriptionTypes = keyof typeof SubscriptionType;

export const SubscriptionTypeArray = Object.values(
  SubscriptionType,
) as SubscriptionTypes[];

export const DefaultSubscriptionType = SubscriptionType.MONTHLY;

export const getSubscriptionTypeQuantityInMonths = (
  type: SubscriptionTypes,
): number => {
  const types = {
    MONTHLY: 1,
    QUARTERLY: 3,
    BIANNUAL: 6,
    YEARLY: 12,
  };

  return types[type];
};
