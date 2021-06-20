import {MigrationInterface, QueryRunner} from "typeorm";

export class addAlertaEnviadaToOrden1624222884403 implements MigrationInterface {
    name = 'addAlertaEnviadaToOrden1624222884403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" ADD "alerta_enviada" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" DROP COLUMN "alerta_enviada"`);
    }

}
