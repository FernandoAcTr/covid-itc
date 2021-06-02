import {MigrationInterface, QueryRunner} from "typeorm";

export class adDiagnosticoColumn1622478683517 implements MigrationInterface {
    name = 'adDiagnosticoColumn1622478683517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solicitud_de_consulta" ADD "diagnostico" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solicitud_de_consulta" DROP COLUMN "diagnostico"`);
    }

}
