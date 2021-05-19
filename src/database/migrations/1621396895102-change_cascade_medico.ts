import {MigrationInterface, QueryRunner} from "typeorm";

export class changeCascadeMedico1621396895102 implements MigrationInterface {
    name = 'changeCascadeMedico1621396895102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `medico` DROP FOREIGN KEY `FK_fa5cd1b5a4c9a5da0c358e92c1c`");
        await queryRunner.query("ALTER TABLE `medico` ADD CONSTRAINT `FK_fa5cd1b5a4c9a5da0c358e92c1c` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `medico` DROP FOREIGN KEY `FK_fa5cd1b5a4c9a5da0c358e92c1c`");
        await queryRunner.query("ALTER TABLE `medico` ADD CONSTRAINT `FK_fa5cd1b5a4c9a5da0c358e92c1c` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`usuario_id`) ON DELETE SET NULL ON UPDATE CASCADE");
    }

}
