import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableOrden1621193958436 implements MigrationInterface {
    name = 'createTableOrden1621193958436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `tipo_prueba` (`tipo_id` int NOT NULL AUTO_INCREMENT, `descripcion` varchar(255) NOT NULL, PRIMARY KEY (`tipo_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `orden_de_prueba` (`orden_id` varchar(36) NOT NULL, `resultado` enum ('NEGATIVO', 'POSITIVO') NULL, `usuario_id` varchar(36) NULL, `medico_id` varchar(36) NULL, `tipo_id` int NULL, PRIMARY KEY (`orden_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `orden_de_prueba` ADD CONSTRAINT `FK_9c18b3fc0215eec13466f077a0b` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`usuario_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `orden_de_prueba` ADD CONSTRAINT `FK_56e60b7d56bef6d763c7cf17de8` FOREIGN KEY (`medico_id`) REFERENCES `medico`(`medico_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `orden_de_prueba` ADD CONSTRAINT `FK_bd939ccaa0059be46f9247f6f76` FOREIGN KEY (`tipo_id`) REFERENCES `tipo_prueba`(`tipo_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `orden_de_prueba` DROP FOREIGN KEY `FK_bd939ccaa0059be46f9247f6f76`");
        await queryRunner.query("ALTER TABLE `orden_de_prueba` DROP FOREIGN KEY `FK_56e60b7d56bef6d763c7cf17de8`");
        await queryRunner.query("ALTER TABLE `orden_de_prueba` DROP FOREIGN KEY `FK_9c18b3fc0215eec13466f077a0b`");
        await queryRunner.query("DROP TABLE `orden_de_prueba`");
        await queryRunner.query("DROP TABLE `tipo_prueba`");
    }

}
