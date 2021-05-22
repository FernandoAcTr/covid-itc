import {MigrationInterface, QueryRunner} from "typeorm";

export class insertPreguntas1621648134423 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`Insert into pregunta(pregunta) values('¿Siente fiebre, escalofríos como los de una gripe, o una fiebre con una temperatura tomada por la boca de 38,1°C (100,6°F) o más?')`)
        queryRunner.query(`Insert into pregunta(pregunta) values('¿Ha tenido una pérdida repentina del olfato sin congestión nasal (nariz tapada), con o sin pérdida del gusto?')`)
        queryRunner.query(`Insert into pregunta(pregunta) values('¿Ha desarrollado una tos o su tos crónica ha empeorado recientemente?')`)
        queryRunner.query(`Insert into pregunta(pregunta) values('¿Tiene problemas al respirar o le falta el aliento?')`)
        queryRunner.query(`Insert into pregunta(pregunta) values('¿Tiene dolor de garganta?')`)
        queryRunner.query(`Insert into pregunta(pregunta) values('¿Tiene secreción o congestión nasal de causa desconocida?')`)
        queryRunner.query(`Insert into pregunta(pregunta) values('Dolor de estómago')`)
        queryRunner.query(`Insert into pregunta(pregunta) values('Náuseas o vómitos')`)
        queryRunner.query(`Insert into pregunta(pregunta) values('Diarrea')`)
        queryRunner.query(`Insert into pregunta(pregunta) values('Fatiga inusualmente intensa sin razón obvia')`)
        queryRunner.query(`Insert into pregunta(pregunta) values('Pérdida significativa de apetito')`)
        queryRunner.query(`Insert into pregunta(pregunta) values('Dolores musculares generalizados inusuales o sin razón obvia (no relacionado con el esfuerzo físico)')`)
        queryRunner.query(`Insert into pregunta(pregunta) values('Dolor de cabeza inhabitual')`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DELETE FROM pregunta where pregunta=¿Siente fiebre, escalofríos como los de una gripe, o una fiebre con una temperatura tomada por la boca de 38,1°C (100,6°F) o más?`)
        queryRunner.query(`DELETE FROM pregunta where pregunta=¿Ha tenido una pérdida repentina del olfato sin congestión nasal (nariz tapada), con o sin pérdida del gusto?`)
        queryRunner.query(`DELETE FROM pregunta where pregunta=¿Ha desarrollado una tos o su tos crónica ha empeorado recientemente?`)
        queryRunner.query(`DELETE FROM pregunta where pregunta=¿Tiene problemas al respirar o le falta el aliento?`)
        queryRunner.query(`DELETE FROM pregunta where pregunta=¿Tiene dolor de garganta?`)
        queryRunner.query(`DELETE FROM pregunta where pregunta=¿Tiene secreción o congestión nasal de causa desconocida?`)
        queryRunner.query(`DELETE FROM pregunta where pregunta=Dolor de estómago`)
        queryRunner.query(`DELETE FROM pregunta where pregunta=Náuseas o vómitos`)
        queryRunner.query(`DELETE FROM pregunta where pregunta=Diarrea`)
        queryRunner.query(`DELETE FROM pregunta where pregunta=Fatiga inusualmente intensa sin razón obvia`)
        queryRunner.query(`DELETE FROM pregunta where pregunta=Pérdida significativa de apetito`)
        queryRunner.query(`DELETE FROM pregunta where pregunta=Dolores musculares generalizados inusuales o sin razón obvia (no relacionado con el esfuerzo físico)`)
        queryRunner.query(`DELETE FROM pregunta where pregunta=Dolor de cabeza inhabitual`)
    }

}
