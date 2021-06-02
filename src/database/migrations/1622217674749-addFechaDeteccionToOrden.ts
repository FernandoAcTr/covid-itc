import {MigrationInterface, QueryRunner} from "typeorm";

export class addFechaDeteccionToOrden1622217674749 implements MigrationInterface {
    name = 'addFechaDeteccionToOrden1622217674749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" ADD "fecha_deteccion" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" DROP COLUMN "fecha_deteccion"`);
    }

}
