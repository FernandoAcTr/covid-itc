import {MigrationInterface, QueryRunner} from "typeorm";

export class changeUniqueRol1622328387794 implements MigrationInterface {
    name = 'changeUniqueRol1622328387794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ADD "rol_id" integer`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_6c336b0a51b5c4d22614cb02533" FOREIGN KEY ("rol_id") REFERENCES "rol"("rol_id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`DROP table usuario_rol`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_6c336b0a51b5c4d22614cb02533"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "rol_id"`);
    }

}
