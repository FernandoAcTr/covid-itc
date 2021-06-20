import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnCreateAtOrden1624165703974 implements MigrationInterface {
    name = 'addColumnCreateAtOrden1624165703974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" DROP COLUMN "create_at"`);
    }

}
