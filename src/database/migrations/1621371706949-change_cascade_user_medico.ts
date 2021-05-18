import {MigrationInterface, QueryRunner} from "typeorm";

export class changeCascadeUserMedico1621371706949 implements MigrationInterface {
    name = 'changeCascadeUserMedico1621371706949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_adc1a6cf965a6bd5cfa522324c7`");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_adc1a6cf965a6bd5cfa522324c7` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `FK_adc1a6cf965a6bd5cfa522324c7`");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `FK_adc1a6cf965a6bd5cfa522324c7` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`usuario_id`) ON DELETE SET NULL ON UPDATE CASCADE");
    }

}
