import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableEstudiante1621146148999 implements MigrationInterface {
    name = 'createTableEstudiante1621146148999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `departamento` (`departamento_id` int NOT NULL AUTO_INCREMENT, `departamento` varchar(255) NOT NULL, PRIMARY KEY (`departamento_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `estudiante` (`nombre` varchar(255) NOT NULL, `a_paterno` varchar(255) NOT NULL, `a_materno` varchar(255) NOT NULL, `estudiante_id` varchar(36) NOT NULL, `carreraCarreraId` int NULL, `usuarioUsuarioId` varchar(36) NULL, UNIQUE INDEX `REL_09de8a411e1514250911acad52` (`usuarioUsuarioId`), PRIMARY KEY (`estudiante_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `carrera` (`carrera_id` int NOT NULL, `carrera` varchar(255) NOT NULL, `departamentoDepartamentoId` int NULL, PRIMARY KEY (`carrera_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `estudiante` ADD CONSTRAINT `FK_016784ee673bdeef005d8969d44` FOREIGN KEY (`carreraCarreraId`) REFERENCES `carrera`(`carrera_id`) ON DELETE RESTRICT ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `estudiante` ADD CONSTRAINT `FK_09de8a411e1514250911acad527` FOREIGN KEY (`usuarioUsuarioId`) REFERENCES `usuario`(`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `carrera` ADD CONSTRAINT `FK_fb96955220299c707e4b1bfeee5` FOREIGN KEY (`departamentoDepartamentoId`) REFERENCES `departamento`(`departamento_id`) ON DELETE RESTRICT ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `carrera` DROP FOREIGN KEY `FK_fb96955220299c707e4b1bfeee5`");
        await queryRunner.query("ALTER TABLE `estudiante` DROP FOREIGN KEY `FK_09de8a411e1514250911acad527`");
        await queryRunner.query("ALTER TABLE `estudiante` DROP FOREIGN KEY `FK_016784ee673bdeef005d8969d44`");
        await queryRunner.query("DROP TABLE `carrera`");
        await queryRunner.query("DROP INDEX `REL_09de8a411e1514250911acad52` ON `estudiante`");
        await queryRunner.query("DROP TABLE `estudiante`");
        await queryRunner.query("DROP TABLE `departamento`");
    }

}
