import { MigrationInterface, QueryRunner } from 'typeorm';

export class V21740698657422 implements MigrationInterface {
  name = 'V21740698657422';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "customerId" integer`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_c6c520dfb9a4d6dd749e73b13de" UNIQUE ("customerId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_c6c520dfb9a4d6dd749e73b13de" FOREIGN KEY ("customerId") REFERENCES "customer_members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_c6c520dfb9a4d6dd749e73b13de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_c6c520dfb9a4d6dd749e73b13de"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "customerId"`);
  }
}
