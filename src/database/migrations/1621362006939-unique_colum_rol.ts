import {MigrationInterface, QueryRunner} from "typeorm";

export class uniqueColumRol1621362006939 implements MigrationInterface {
    name = 'uniqueColumRol1621362006939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `rol` CHANGE `rol` `rol` enum ('estudiante', 'personal', 'monitor', 'administrador', 'directivo') NOT NULL");
        await queryRunner.query("ALTER TABLE `rol` ADD UNIQUE INDEX `IDX_f75f91537c43db80c3ca8ef34f` (`rol`)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `rol` DROP INDEX `IDX_f75f91537c43db80c3ca8ef34f`");
        await queryRunner.query("ALTER TABLE `rol` CHANGE `rol` `rol` enum ('estudiante', 'personal', 'monitor', 'administrador', 'directivo') NOT NULL");
    }

}
