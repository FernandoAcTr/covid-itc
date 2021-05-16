import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableAlerta1621178910983 implements MigrationInterface {
    name = 'createTableAlerta1621178910983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_8e18a9cefbd560324d29285640` ON `estudiante`");
        await queryRunner.query("CREATE TABLE `alerta` (`alerta_id` varchar(36) NOT NULL, `alerta` text NOT NULL, `status` enum ('pendiente', 'leida') NOT NULL DEFAULT 'pendiente', `usuario_id` varchar(36) NULL, PRIMARY KEY (`alerta_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `usuario` DROP COLUMN `status`");
        await queryRunner.query("ALTER TABLE `usuario` ADD `status` enum ('HABILITADO', 'DESHABILITADO') NOT NULL DEFAULT 'HABILITADO'");
        await queryRunner.query("ALTER TABLE `usuario` CHANGE `sospechoso` `sospechoso` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `alerta` ADD CONSTRAINT `FK_685277b93d533c64f1d0dec58ec` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`usuario_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alerta` DROP FOREIGN KEY `FK_685277b93d533c64f1d0dec58ec`");
        await queryRunner.query("ALTER TABLE `usuario` CHANGE `sospechoso` `sospechoso` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `usuario` DROP COLUMN `status`");
        await queryRunner.query("ALTER TABLE `usuario` ADD `status` tinyint NOT NULL");
        await queryRunner.query("DROP TABLE `alerta`");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_8e18a9cefbd560324d29285640` ON `estudiante` (`usuario_id`)");
    }

}
