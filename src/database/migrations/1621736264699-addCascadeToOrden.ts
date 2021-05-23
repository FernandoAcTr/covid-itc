import {MigrationInterface, QueryRunner} from "typeorm";

export class addCascadeToOrden1621736264699 implements MigrationInterface {
    name = 'addCascadeToOrden1621736264699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" DROP CONSTRAINT "FK_9c18b3fc0215eec13466f077a0b"`);
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" DROP CONSTRAINT "FK_56e60b7d56bef6d763c7cf17de8"`);
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" ADD CONSTRAINT "FK_9c18b3fc0215eec13466f077a0b" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" ADD CONSTRAINT "FK_56e60b7d56bef6d763c7cf17de8" FOREIGN KEY ("medico_id") REFERENCES "medico"("medico_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" DROP CONSTRAINT "FK_56e60b7d56bef6d763c7cf17de8"`);
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" DROP CONSTRAINT "FK_9c18b3fc0215eec13466f077a0b"`);
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" ADD CONSTRAINT "FK_56e60b7d56bef6d763c7cf17de8" FOREIGN KEY ("medico_id") REFERENCES "medico"("medico_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" ADD CONSTRAINT "FK_9c18b3fc0215eec13466f077a0b" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
