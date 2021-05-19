import {MigrationInterface, QueryRunner} from "typeorm";

export class addDatesToAlert1621465908320 implements MigrationInterface {
    name = 'addDatesToAlert1621465908320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alerta` DROP FOREIGN KEY `FK_685277b93d533c64f1d0dec58ec`");
        await queryRunner.query("ALTER TABLE `alerta` ADD `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `alerta` ADD `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `alerta` ADD CONSTRAINT `FK_685277b93d533c64f1d0dec58ec` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alerta` DROP FOREIGN KEY `FK_685277b93d533c64f1d0dec58ec`");
        await queryRunner.query("ALTER TABLE `alerta` DROP COLUMN `update_at`");
        await queryRunner.query("ALTER TABLE `alerta` DROP COLUMN `create_at`");
        await queryRunner.query("ALTER TABLE `alerta` ADD CONSTRAINT `FK_685277b93d533c64f1d0dec58ec` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`usuario_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
