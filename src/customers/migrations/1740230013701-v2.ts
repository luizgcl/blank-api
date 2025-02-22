import { MigrationInterface, QueryRunner } from 'typeorm';

export class V21740230013701 implements MigrationInterface {
  name = 'V21740230013701';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ALTER COLUMN "installments" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ALTER COLUMN "installment_value" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "UNIQUE_DOCUMENT"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "UNIQUE_DOCUMENT" UNIQUE ("document", "document_type")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "UNIQUE_DOCUMENT"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "UNIQUE_DOCUMENT" UNIQUE ("document", "document_type")`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ALTER COLUMN "installment_value" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ALTER COLUMN "installments" SET NOT NULL`,
    );
  }
}
