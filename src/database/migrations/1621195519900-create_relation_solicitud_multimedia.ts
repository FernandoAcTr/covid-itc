import {MigrationInterface, QueryRunner} from "typeorm";

export class createRelationSolicitudMultimedia1621195519900 implements MigrationInterface {
    name = 'createRelationSolicitudMultimedia1621195519900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `solicitud_multimedia` (`solicitud_id` varchar(36) NOT NULL, `multimedia_id` varchar(36) NOT NULL, INDEX `IDX_d2233a0cc2c36ff75e08d3b436` (`solicitud_id`), INDEX `IDX_7d0ae6c605746747c38f10594d` (`multimedia_id`), PRIMARY KEY (`solicitud_id`, `multimedia_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `solicitud_multimedia` ADD CONSTRAINT `FK_d2233a0cc2c36ff75e08d3b436d` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitud_de_consulta`(`solicitud_id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `solicitud_multimedia` ADD CONSTRAINT `FK_7d0ae6c605746747c38f10594df` FOREIGN KEY (`multimedia_id`) REFERENCES `multimedia`(`multimedia_id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `solicitud_multimedia` DROP FOREIGN KEY `FK_7d0ae6c605746747c38f10594df`");
        await queryRunner.query("ALTER TABLE `solicitud_multimedia` DROP FOREIGN KEY `FK_d2233a0cc2c36ff75e08d3b436d`");
        await queryRunner.query("DROP INDEX `IDX_7d0ae6c605746747c38f10594d` ON `solicitud_multimedia`");
        await queryRunner.query("DROP INDEX `IDX_d2233a0cc2c36ff75e08d3b436` ON `solicitud_multimedia`");
        await queryRunner.query("DROP TABLE `solicitud_multimedia`");
    }

}
