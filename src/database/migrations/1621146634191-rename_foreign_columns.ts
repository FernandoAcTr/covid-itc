import {MigrationInterface, QueryRunner} from "typeorm";

export class renameForeignColumns1621146634191 implements MigrationInterface {
    name = 'renameForeignColumns1621146634191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `estudiante` DROP FOREIGN KEY `FK_016784ee673bdeef005d8969d44`");
        await queryRunner.query("ALTER TABLE `estudiante` DROP FOREIGN KEY `FK_09de8a411e1514250911acad527`");
        await queryRunner.query("ALTER TABLE `carrera` DROP FOREIGN KEY `FK_fb96955220299c707e4b1bfeee5`");
        await queryRunner.query("DROP INDEX `REL_09de8a411e1514250911acad52` ON `estudiante`");
        await queryRunner.query("ALTER TABLE `carrera` CHANGE `departamentoDepartamentoId` `departamento_id` int NULL");
        await queryRunner.query("ALTER TABLE `estudiante` DROP COLUMN `carreraCarreraId`");
        await queryRunner.query("ALTER TABLE `estudiante` DROP COLUMN `usuarioUsuarioId`");
        await queryRunner.query("ALTER TABLE `estudiante` ADD `carrera_id` int NULL");
        await queryRunner.query("ALTER TABLE `estudiante` ADD `usuario_id` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `estudiante` ADD UNIQUE INDEX `IDX_8e18a9cefbd560324d29285640` (`usuario_id`)");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_8e18a9cefbd560324d29285640` ON `estudiante` (`usuario_id`)");
        await queryRunner.query("ALTER TABLE `estudiante` ADD CONSTRAINT `FK_166c09fb5ec5052fa60176c080e` FOREIGN KEY (`carrera_id`) REFERENCES `carrera`(`carrera_id`) ON DELETE RESTRICT ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `estudiante` ADD CONSTRAINT `FK_8e18a9cefbd560324d292856406` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `carrera` ADD CONSTRAINT `FK_9178fb28cdc413953d5e56a91c8` FOREIGN KEY (`departamento_id`) REFERENCES `departamento`(`departamento_id`) ON DELETE RESTRICT ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `carrera` DROP FOREIGN KEY `FK_9178fb28cdc413953d5e56a91c8`");
        await queryRunner.query("ALTER TABLE `estudiante` DROP FOREIGN KEY `FK_8e18a9cefbd560324d292856406`");
        await queryRunner.query("ALTER TABLE `estudiante` DROP FOREIGN KEY `FK_166c09fb5ec5052fa60176c080e`");
        await queryRunner.query("DROP INDEX `REL_8e18a9cefbd560324d29285640` ON `estudiante`");
        await queryRunner.query("ALTER TABLE `estudiante` DROP INDEX `IDX_8e18a9cefbd560324d29285640`");
        await queryRunner.query("ALTER TABLE `estudiante` DROP COLUMN `usuario_id`");
        await queryRunner.query("ALTER TABLE `estudiante` DROP COLUMN `carrera_id`");
        await queryRunner.query("ALTER TABLE `estudiante` ADD `usuarioUsuarioId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `estudiante` ADD `carreraCarreraId` int NULL");
        await queryRunner.query("ALTER TABLE `carrera` CHANGE `departamento_id` `departamentoDepartamentoId` int NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_09de8a411e1514250911acad52` ON `estudiante` (`usuarioUsuarioId`)");
        await queryRunner.query("ALTER TABLE `carrera` ADD CONSTRAINT `FK_fb96955220299c707e4b1bfeee5` FOREIGN KEY (`departamentoDepartamentoId`) REFERENCES `departamento`(`departamento_id`) ON DELETE RESTRICT ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `estudiante` ADD CONSTRAINT `FK_09de8a411e1514250911acad527` FOREIGN KEY (`usuarioUsuarioId`) REFERENCES `usuario`(`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `estudiante` ADD CONSTRAINT `FK_016784ee673bdeef005d8969d44` FOREIGN KEY (`carreraCarreraId`) REFERENCES `carrera`(`carrera_id`) ON DELETE RESTRICT ON UPDATE CASCADE");
    }

}
