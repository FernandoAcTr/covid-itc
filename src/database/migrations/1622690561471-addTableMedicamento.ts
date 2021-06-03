import {MigrationInterface, QueryRunner} from "typeorm";

export class addTableMedicamento1622690561471 implements MigrationInterface {
    name = 'addTableMedicamento1622690561471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medicamento" ("medicamento_id" SERIAL NOT NULL, "descripcion" character varying NOT NULL, CONSTRAINT "PK_43dfb5f1eaadefa0600f95167e5" PRIMARY KEY ("medicamento_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "medicamento"`);
    }

}
