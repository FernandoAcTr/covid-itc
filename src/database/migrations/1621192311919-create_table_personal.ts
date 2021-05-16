import {MigrationInterface, QueryRunner} from "typeorm";

export class createTablePersonal1621192311919 implements MigrationInterface {
    name = 'createTablePersonal1621192311919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `personal` (`nombre` varchar(255) NOT NULL, `a_paterno` varchar(255) NOT NULL, `a_materno` varchar(255) NOT NULL, `personal_id` varchar(36) NOT NULL, `rfc` varchar(255) NOT NULL, `departamento_id` int NULL, `usuario_id` varchar(36) NULL, UNIQUE INDEX `REL_adc1a6cf965a6bd5cfa522324c` (`usuario_id`), PRIMARY KEY (`personal_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_0158ddfdae638754a13b4e2a15d` FOREIGN KEY (`departamento_id`) REFERENCES `departamento`(`departamento_id`) ON DELETE SET NULL ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_adc1a6cf965a6bd5cfa522324c7` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`usuario_id`) ON DELETE SET NULL ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_adc1a6cf965a6bd5cfa522324c7`");
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_0158ddfdae638754a13b4e2a15d`");
        await queryRunner.query("DROP INDEX `REL_adc1a6cf965a6bd5cfa522324c` ON `personal`");
        await queryRunner.query("DROP TABLE `personal`");
    }

}
