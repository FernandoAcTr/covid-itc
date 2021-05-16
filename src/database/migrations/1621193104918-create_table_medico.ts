import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableMedico1621193104918 implements MigrationInterface {
    name = 'createTableMedico1621193104918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `medico` (`nombre` varchar(255) NOT NULL, `a_paterno` varchar(255) NOT NULL, `a_materno` varchar(255) NOT NULL, `medico_id` varchar(36) NOT NULL, `rfc` varchar(13) NOT NULL, `cedula` varchar(8) NOT NULL, `usuario_id` varchar(36) NULL, PRIMARY KEY (`medico_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `medico` ADD CONSTRAINT `FK_fa5cd1b5a4c9a5da0c358e92c1c` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`usuario_id`) ON DELETE SET NULL ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `medico` DROP FOREIGN KEY `FK_fa5cd1b5a4c9a5da0c358e92c1c`");
        await queryRunner.query("DROP TABLE `medico`");
    }

}
