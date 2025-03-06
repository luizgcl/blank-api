export enum OrderFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export type OrderFrequencyType = keyof typeof OrderFrequency;

export const OrderFrequencyArray = Object.values(
  OrderFrequency,
) as OrderFrequencyType[];

export const DefaultOrderFrequency = OrderFrequency.MONTHLY;
