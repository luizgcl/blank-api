import { MigrationInterface, QueryRunner } from 'typeorm';

export class V41740785009812 implements MigrationInterface {
  name = 'V41740785009812';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "UNIQUE_SLUG_CATEGORY" UNIQUE ("slug", "customer_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "UNIQUE_SLUG_CATEGORY"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09" UNIQUE ("slug")`,
    );
  }
}
