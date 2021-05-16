import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableRol1621181008553 implements MigrationInterface {
    name = 'createTableRol1621181008553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `rol` (`rol_id` int NOT NULL AUTO_INCREMENT, `rol` enum ('estudiante', 'personal', 'monitor', 'administrador', 'directivo') NOT NULL, PRIMARY KEY (`rol_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `usuario_rol` (`usuario_id` varchar(36) NOT NULL, `rol_id` int NOT NULL, INDEX `IDX_29e9a9079c7ba01c1b301cf555` (`usuario_id`), INDEX `IDX_ac8911cd54a61461c992654140` (`rol_id`), PRIMARY KEY (`usuario_id`, `rol_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `usuario_rol` ADD CONSTRAINT `FK_29e9a9079c7ba01c1b301cf5555` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`usuario_id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `usuario_rol` ADD CONSTRAINT `FK_ac8911cd54a61461c9926541401` FOREIGN KEY (`rol_id`) REFERENCES `rol`(`rol_id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuario_rol` DROP FOREIGN KEY `FK_ac8911cd54a61461c9926541401`");
        await queryRunner.query("ALTER TABLE `usuario_rol` DROP FOREIGN KEY `FK_29e9a9079c7ba01c1b301cf5555`");
        await queryRunner.query("DROP INDEX `IDX_ac8911cd54a61461c992654140` ON `usuario_rol`");
        await queryRunner.query("DROP INDEX `IDX_29e9a9079c7ba01c1b301cf555` ON `usuario_rol`");
        await queryRunner.query("DROP TABLE `usuario_rol`");
        await queryRunner.query("DROP TABLE `rol`");
    }

}
