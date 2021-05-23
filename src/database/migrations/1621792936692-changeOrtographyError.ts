import {MigrationInterface, QueryRunner} from "typeorm";

export class changeOrtographyError1621792936692 implements MigrationInterface {
    name = 'changeOrtographyError1621792936692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "solicitud_de_consulta_modalidad_enum" RENAME TO "solicitud_de_consulta_modalidad_enum_old"`);
        await queryRunner.query(`CREATE TYPE "solicitud_de_consulta_modalidad_enum" AS ENUM('virtual', 'presencial')`);
        await queryRunner.query(`ALTER TABLE "solicitud_de_consulta" ALTER COLUMN "modalidad" TYPE "solicitud_de_consulta_modalidad_enum" USING "modalidad"::"text"::"solicitud_de_consulta_modalidad_enum"`);
        await queryRunner.query(`DROP TYPE "solicitud_de_consulta_modalidad_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "solicitud_de_consulta_modalidad_enum_old" AS ENUM('virtual', 'prescencial')`);
        await queryRunner.query(`ALTER TABLE "solicitud_de_consulta" ALTER COLUMN "modalidad" TYPE "solicitud_de_consulta_modalidad_enum_old" USING "modalidad"::"text"::"solicitud_de_consulta_modalidad_enum_old"`);
        await queryRunner.query(`DROP TYPE "solicitud_de_consulta_modalidad_enum"`);
        await queryRunner.query(`ALTER TYPE "solicitud_de_consulta_modalidad_enum_old" RENAME TO "solicitud_de_consulta_modalidad_enum"`);
    }

}
