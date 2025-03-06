import { MigrationInterface, QueryRunner } from 'typeorm';

export class V31740784274348 implements MigrationInterface {
  name = 'V31740784274348';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" RENAME COLUMN "order_date" TO "order_frequency"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "order_frequency"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "order_frequency" character varying NOT NULL DEFAULT 'MONTHLY'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "order_frequency"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "order_frequency" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" RENAME COLUMN "order_frequency" TO "order_date"`,
    );
  }
}
