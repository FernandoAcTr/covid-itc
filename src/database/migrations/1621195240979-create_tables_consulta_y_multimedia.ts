import {MigrationInterface, QueryRunner} from "typeorm";

export class createTablesConsultaYMultimedia1621195240979 implements MigrationInterface {
    name = 'createTablesConsultaYMultimedia1621195240979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `multimedia` (`multimedia_id` varchar(36) NOT NULL, `url` varchar(255) NOT NULL, PRIMARY KEY (`multimedia_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `solicitud_de_consulta` (`solicitud_id` varchar(36) NOT NULL, `sintomas` text NOT NULL, `modalidad` enum ('virtual', 'prescencial') NOT NULL, `status` enum ('pendiente', 'atendida') NOT NULL DEFAULT 'pendiente', `receta` text NULL, `fecha_solicitud` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `fecha_atencion` datetime NULL, `usuario_id` varchar(36) NULL, `medico_id` varchar(36) NULL, PRIMARY KEY (`solicitud_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `solicitud_de_consulta` ADD CONSTRAINT `FK_ecfdf45aca9a8acc51728634096` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`usuario_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `solicitud_de_consulta` ADD CONSTRAINT `FK_132a78fc915673f78bf1c2eeba8` FOREIGN KEY (`medico_id`) REFERENCES `medico`(`medico_id`) ON DELETE NO ACTION ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `solicitud_de_consulta` DROP FOREIGN KEY `FK_132a78fc915673f78bf1c2eeba8`");
        await queryRunner.query("ALTER TABLE `solicitud_de_consulta` DROP FOREIGN KEY `FK_ecfdf45aca9a8acc51728634096`");
        await queryRunner.query("DROP TABLE `solicitud_de_consulta`");
        await queryRunner.query("DROP TABLE `multimedia`");
    }

}
