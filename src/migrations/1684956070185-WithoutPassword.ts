import { MigrationInterface, QueryRunner } from "typeorm";

export class WithoutPassword1684956070185 implements MigrationInterface {
    name = 'WithoutPassword1684956070185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "password" character varying(120) NOT NULL`);
    }

}
