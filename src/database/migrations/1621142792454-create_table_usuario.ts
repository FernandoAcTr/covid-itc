import { MigrationInterface, QueryRunner } from 'typeorm'

export class createTableUsuario1621142792454 implements MigrationInterface {
  name = 'createTableUsuario1621142792454'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `usuario` (`usuario_id` varchar(36) NOT NULL, `email` varchar(100) NOT NULL, `password` varchar(72) NOT NULL, `status` tinyint NOT NULL, `sospechoso` tinyint NOT NULL, PRIMARY KEY (`usuario_id`)) ENGINE=InnoDB'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `usuario`')
  }
}
