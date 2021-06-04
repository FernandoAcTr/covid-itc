import {MigrationInterface, QueryRunner} from "typeorm";

export class relationSolicitudMedicamento1622694756989 implements MigrationInterface {
    name = 'relationSolicitudMedicamento1622694756989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "solicitud_medicamento" ("id_relation" SERIAL NOT NULL, "receta" character varying NOT NULL, "solicitud_consulta_id" uuid, "medicamento_id" integer, CONSTRAINT "PK_76d5e41ff766e466a5c221e1351" PRIMARY KEY ("id_relation"))`);
        await queryRunner.query(`ALTER TABLE "solicitud_medicamento" ADD CONSTRAINT "FK_841aa572a4b357d0e4026149bdb" FOREIGN KEY ("solicitud_consulta_id") REFERENCES "solicitud_de_consulta"("solicitud_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "solicitud_medicamento" ADD CONSTRAINT "FK_1f4d28a03cf1e33899ef48abd00" FOREIGN KEY ("medicamento_id") REFERENCES "medicamento"("medicamento_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solicitud_medicamento" DROP CONSTRAINT "FK_1f4d28a03cf1e33899ef48abd00"`);
        await queryRunner.query(`ALTER TABLE "solicitud_medicamento" DROP CONSTRAINT "FK_841aa572a4b357d0e4026149bdb"`);
        await queryRunner.query(`DROP TABLE "solicitud_medicamento"`);
    }

}
