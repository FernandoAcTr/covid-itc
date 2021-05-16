import {MigrationInterface, QueryRunner} from "typeorm";

export class createEncuestaModule1621197155647 implements MigrationInterface {
    name = 'createEncuestaModule1621197155647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `pregunta` (`pregunta_id` int NOT NULL AUTO_INCREMENT, `pregunta` varchar(255) NOT NULL, PRIMARY KEY (`pregunta_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `encuesta` (`encuesta_id` int NOT NULL AUTO_INCREMENT, `modalidad` enum ('obligatoria', 'voluntaria', 'aleatoria') NOT NULL, `otros_sintomas` text NULL, `fecha_aplicacion` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `usuario_id` varchar(36) NULL, PRIMARY KEY (`encuesta_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `encuesta_detalle` (`encuesta_id` int NOT NULL, `pregunta_id` int NOT NULL, INDEX `IDX_cef0e5f1c2bc6c08fee046e375` (`encuesta_id`), INDEX `IDX_e922c21aa0f22fafab93093b6a` (`pregunta_id`), PRIMARY KEY (`encuesta_id`, `pregunta_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `encuesta` ADD CONSTRAINT `FK_02f4c1329d7538c91e2322e7e24` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `encuesta_detalle` ADD CONSTRAINT `FK_cef0e5f1c2bc6c08fee046e3751` FOREIGN KEY (`encuesta_id`) REFERENCES `encuesta`(`encuesta_id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `encuesta_detalle` ADD CONSTRAINT `FK_e922c21aa0f22fafab93093b6a9` FOREIGN KEY (`pregunta_id`) REFERENCES `pregunta`(`pregunta_id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `encuesta_detalle` DROP FOREIGN KEY `FK_e922c21aa0f22fafab93093b6a9`");
        await queryRunner.query("ALTER TABLE `encuesta_detalle` DROP FOREIGN KEY `FK_cef0e5f1c2bc6c08fee046e3751`");
        await queryRunner.query("ALTER TABLE `encuesta` DROP FOREIGN KEY `FK_02f4c1329d7538c91e2322e7e24`");
        await queryRunner.query("DROP INDEX `IDX_e922c21aa0f22fafab93093b6a` ON `encuesta_detalle`");
        await queryRunner.query("DROP INDEX `IDX_cef0e5f1c2bc6c08fee046e375` ON `encuesta_detalle`");
        await queryRunner.query("DROP TABLE `encuesta_detalle`");
        await queryRunner.query("DROP TABLE `encuesta`");
        await queryRunner.query("DROP TABLE `pregunta`");
    }

}
