import {MigrationInterface, QueryRunner} from "typeorm";

export class insertRoles1621648170116 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`INSERT INTO rol(rol) values('administrador')`)
        queryRunner.query(`INSERT INTO rol(rol) values('estudiante')`)
        queryRunner.query(`INSERT INTO rol(rol) values('personal')`)
        queryRunner.query(`INSERT INTO rol(rol) values('monitor')`)
        queryRunner.query(`INSERT INTO rol(rol) values('directivo')`)
        queryRunner.query(`INSERT INTO rol(rol) values('medico')`)
        queryRunner.query(`INSERT INTO modalidad_encuesta(modalidad) values('voluntaria')`)
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DELETE FROM rol where rol='administrador'`)
        queryRunner.query(`DELETE FROM rol where rol='estudiante'`)
        queryRunner.query(`DELETE FROM rol where rol='personal'`)
        queryRunner.query(`DELETE FROM rol where rol='monitor'`)
        queryRunner.query(`DELETE FROM rol where rol='directivo'`)
        queryRunner.query(`DELETE FROM rol where rol='medico'`)
        queryRunner.query(`DELETE FROM modalidad_encuesta where modalidad='voluntaria'`)
    }


}
