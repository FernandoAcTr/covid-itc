import {MigrationInterface, QueryRunner} from "typeorm";

export class changeStatusPorHabilitado1621350236564 implements MigrationInterface {
    name = 'changeStatusPorHabilitado1621350236564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuario` CHANGE `status` `habilitado` enum ('HABILITADO', 'DESHABILITADO') NOT NULL DEFAULT 'HABILITADO'");
        await queryRunner.query("ALTER TABLE `usuario` DROP COLUMN `habilitado`");
        await queryRunner.query("ALTER TABLE `usuario` ADD `habilitado` tinyint NOT NULL DEFAULT 1");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuario` DROP COLUMN `habilitado`");
        await queryRunner.query("ALTER TABLE `usuario` ADD `habilitado` enum ('HABILITADO', 'DESHABILITADO') NOT NULL DEFAULT 'HABILITADO'");
        await queryRunner.query("ALTER TABLE `usuario` CHANGE `habilitado` `status` enum ('HABILITADO', 'DESHABILITADO') NOT NULL DEFAULT 'HABILITADO'");
    }

}
