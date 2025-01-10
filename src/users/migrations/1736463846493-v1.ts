import { MigrationInterface, QueryRunner } from 'typeorm';

export class V11736463846493 implements MigrationInterface {
    name = 'V11736463846493';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "picture_path" character varying NOT NULL, "email" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'EMPLOYEE', "password_hash" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2b179aaad57da1dd6e4ff36f2bf" UNIQUE ("picture_path"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
