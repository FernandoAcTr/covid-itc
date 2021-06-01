import {MigrationInterface, QueryRunner} from "typeorm";

export class addTableTrazabilidad1622505976381 implements MigrationInterface {
    name = 'addTableTrazabilidad1622505976381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trazabilidad" ("trazabilidad_id" BIGSERIAL NOT NULL, "fecha" TIMESTAMP NOT NULL, "avisado" boolean NOT NULL DEFAULT false, "usuario_id" uuid, "contacto" uuid, CONSTRAINT "PK_725468ad13351346bcc1385fb68" PRIMARY KEY ("trazabilidad_id"))`);
        await queryRunner.query(`ALTER TABLE "trazabilidad" ADD CONSTRAINT "FK_835bf8eccfdb026916e2f505c97" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trazabilidad" ADD CONSTRAINT "FK_a243f07e69e4d74b27b7a4bfce9" FOREIGN KEY ("contacto") REFERENCES "usuario"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trazabilidad" DROP CONSTRAINT "FK_a243f07e69e4d74b27b7a4bfce9"`);
        await queryRunner.query(`ALTER TABLE "trazabilidad" DROP CONSTRAINT "FK_835bf8eccfdb026916e2f505c97"`);
        await queryRunner.query(`DROP TABLE "trazabilidad"`);
    }

}
