import {MigrationInterface, QueryRunner} from "typeorm";

export class addCascadeToConsulta1621792633816 implements MigrationInterface {
    name = 'addCascadeToConsulta1621792633816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solicitud_de_consulta" DROP CONSTRAINT "FK_ecfdf45aca9a8acc51728634096"`);
        await queryRunner.query(`ALTER TABLE "solicitud_de_consulta" DROP CONSTRAINT "FK_132a78fc915673f78bf1c2eeba8"`);
        await queryRunner.query(`ALTER TABLE "solicitud_de_consulta" ADD CONSTRAINT "FK_ecfdf45aca9a8acc51728634096" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "solicitud_de_consulta" ADD CONSTRAINT "FK_132a78fc915673f78bf1c2eeba8" FOREIGN KEY ("medico_id") REFERENCES "medico"("medico_id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solicitud_de_consulta" DROP CONSTRAINT "FK_132a78fc915673f78bf1c2eeba8"`);
        await queryRunner.query(`ALTER TABLE "solicitud_de_consulta" DROP CONSTRAINT "FK_ecfdf45aca9a8acc51728634096"`);
        await queryRunner.query(`ALTER TABLE "solicitud_de_consulta" ADD CONSTRAINT "FK_132a78fc915673f78bf1c2eeba8" FOREIGN KEY ("medico_id") REFERENCES "medico"("medico_id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "solicitud_de_consulta" ADD CONSTRAINT "FK_ecfdf45aca9a8acc51728634096" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
