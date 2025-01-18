import { ValueTransformer } from 'typeorm';

export class ColumnNumericTransformer implements ValueTransformer {
  to(value: number): number {
    return value;
  }
  from(value: string) {
    return parseFloat(value);
  }
}
