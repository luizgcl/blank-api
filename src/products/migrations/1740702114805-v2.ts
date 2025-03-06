import { MigrationInterface, QueryRunner } from 'typeorm';

export class V21740702114805 implements MigrationInterface {
  name = 'V21740702114805';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "color" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "color"`);
  }
}
