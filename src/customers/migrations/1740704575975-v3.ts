import { MigrationInterface, QueryRunner } from 'typeorm';

export class V31740704575975 implements MigrationInterface {
  name = 'V31740704575975';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer_members" DROP CONSTRAINT "FK_a11937b0ad43118da5f621e2c08"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_c7bc1ffb56c570f42053fa7503b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "customer_id" TO "customer_member_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME CONSTRAINT "UQ_c7bc1ffb56c570f42053fa7503b" TO "UQ_2444970b9b531528ced0b2277ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_members" DROP COLUMN "user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "UNIQUE_DOCUMENT"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "UNIQUE_DOCUMENT" UNIQUE ("document", "document_type")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_2444970b9b531528ced0b2277ac" FOREIGN KEY ("customer_member_id") REFERENCES "customer_members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_2444970b9b531528ced0b2277ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "UNIQUE_DOCUMENT"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "UNIQUE_DOCUMENT" UNIQUE ("document", "document_type")`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_members" ADD "user_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME CONSTRAINT "UQ_2444970b9b531528ced0b2277ac" TO "UQ_c7bc1ffb56c570f42053fa7503b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "customer_member_id" TO "customer_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_c7bc1ffb56c570f42053fa7503b" FOREIGN KEY ("customer_id") REFERENCES "customer_members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_members" ADD CONSTRAINT "FK_a11937b0ad43118da5f621e2c08" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
