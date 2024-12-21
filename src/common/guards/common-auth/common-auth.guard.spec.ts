import { CommonAuthGuard } from './common-auth.guard';

describe('CommonAuthGuard', () => {
  it('should be defined', () => {
    expect(new CommonAuthGuard()).toBeDefined();
  });
});
