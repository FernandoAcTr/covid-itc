import {MigrationInterface, QueryRunner} from "typeorm";

export class carreraAutoincrementKey1621273246636 implements MigrationInterface {
    name = 'carreraAutoincrementKey1621273246636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `estudiante` DROP FOREIGN KEY `FK_166c09fb5ec5052fa60176c080e`");
        await queryRunner.query("ALTER TABLE `carrera` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `carrera` DROP COLUMN `carrera_id`");
        await queryRunner.query("ALTER TABLE `carrera` ADD `carrera_id` int NOT NULL PRIMARY KEY AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `estudiante` ADD CONSTRAINT `FK_166c09fb5ec5052fa60176c080e` FOREIGN KEY (`carrera_id`) REFERENCES `carrera`(`carrera_id`) ON DELETE RESTRICT ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `estudiante` DROP FOREIGN KEY `FK_166c09fb5ec5052fa60176c080e`");
        await queryRunner.query("ALTER TABLE `carrera` DROP COLUMN `carrera_id`");
        await queryRunner.query("ALTER TABLE `carrera` ADD `carrera_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `carrera` ADD PRIMARY KEY (`carrera_id`)");
        await queryRunner.query("ALTER TABLE `estudiante` ADD CONSTRAINT `FK_166c09fb5ec5052fa60176c080e` FOREIGN KEY (`carrera_id`) REFERENCES `carrera`(`carrera_id`) ON DELETE RESTRICT ON UPDATE CASCADE");
    }

}
