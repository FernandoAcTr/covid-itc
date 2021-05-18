import {MigrationInterface, QueryRunner} from "typeorm";

export class addRolMedico1621369761543 implements MigrationInterface {
    name = 'addRolMedico1621369761543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `rol` CHANGE `rol` `rol` enum ('estudiante', 'personal', 'monitor', 'administrador', 'directivo', 'medico') NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `rol` CHANGE `rol` `rol` enum ('estudiante', 'personal', 'monitor', 'administrador', 'directivo') NOT NULL");
    }

}
