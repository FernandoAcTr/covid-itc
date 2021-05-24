import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnPublicId1621891973933 implements MigrationInterface {
    name = 'addColumnPublicId1621891973933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "multimedia" ADD "public_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "multimedia" DROP COLUMN "public_id"`);
    }

}
