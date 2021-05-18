import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableModalidad1621308084088 implements MigrationInterface {
    name = 'createTableModalidad1621308084088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `modalidad_encuesta` (`id` int NOT NULL AUTO_INCREMENT, `modalidad` enum ('obligatoria', 'voluntaria', 'aleatoria') NOT NULL, `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `modalidad_encuesta`");
    }

}
