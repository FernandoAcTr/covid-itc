import {MigrationInterface, QueryRunner} from "typeorm";

export class emailUniqueRestric1621275730986 implements MigrationInterface {
    name = 'emailUniqueRestric1621275730986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuario` ADD UNIQUE INDEX `IDX_2863682842e688ca198eb25c12` (`email`)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuario` DROP INDEX `IDX_2863682842e688ca198eb25c12`");
    }

}
