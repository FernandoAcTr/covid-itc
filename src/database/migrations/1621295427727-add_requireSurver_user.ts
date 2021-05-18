import {MigrationInterface, QueryRunner} from "typeorm";

export class addRequireSurverUser1621295427727 implements MigrationInterface {
    name = 'addRequireSurverUser1621295427727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuario` ADD `requireSuvey` tinyint NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuario` DROP COLUMN `requireSuvey`");
    }

}
