import {MigrationInterface, QueryRunner} from "typeorm";

export class dropColumnReceta1623708356777 implements MigrationInterface {
    name = 'dropColumnReceta1623708356777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solicitud_de_consulta" DROP COLUMN "receta"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solicitud_de_consulta" ADD "receta" text`);
    }

}
