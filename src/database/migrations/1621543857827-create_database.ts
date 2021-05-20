import {MigrationInterface, QueryRunner} from "typeorm";

export class createDatabase1621543857827 implements MigrationInterface {
    name = 'createDatabase1621543857827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "rol_rol_enum" AS ENUM('estudiante', 'personal', 'monitor', 'administrador', 'directivo', 'medico')`);
        await queryRunner.query(`CREATE TABLE "rol" ("rol_id" SERIAL NOT NULL, "rol" "rol_rol_enum" NOT NULL, CONSTRAINT "UQ_f75f91537c43db80c3ca8ef34f8" UNIQUE ("rol"), CONSTRAINT "PK_69836b191b6c07ec3fd08de3a1a" PRIMARY KEY ("rol_id"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("usuario_id" uuid NOT NULL DEFAULT gen_random_uuid(), "email" character varying(100) NOT NULL, "password" character varying(72) NOT NULL, "habilitado" boolean NOT NULL DEFAULT true, "sospechoso" boolean NOT NULL DEFAULT false, "requireSuvey" boolean NOT NULL, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_877d906b2b8b32d99cf7164ec19" PRIMARY KEY ("usuario_id"))`);
        await queryRunner.query(`CREATE TYPE "alerta_status_enum" AS ENUM('pendiente', 'leida')`);
        await queryRunner.query(`CREATE TABLE "alerta" ("alerta_id" uuid NOT NULL DEFAULT gen_random_uuid(), "alerta" text NOT NULL, "status" "alerta_status_enum" NOT NULL DEFAULT 'pendiente', "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "usuario_id" uuid, CONSTRAINT "PK_0274ff6a9afb0163fad85ec8c99" PRIMARY KEY ("alerta_id"))`);
        await queryRunner.query(`CREATE TABLE "departamento" ("departamento_id" SERIAL NOT NULL, "departamento" character varying NOT NULL, CONSTRAINT "PK_13b53b18ac87bb9746f7d2fc71d" PRIMARY KEY ("departamento_id"))`);
        await queryRunner.query(`CREATE TABLE "estudiante" ("nombre" character varying NOT NULL, "a_paterno" character varying NOT NULL, "a_materno" character varying NOT NULL, "estudiante_id" uuid NOT NULL DEFAULT gen_random_uuid(), "carrera_id" integer, "usuario_id" uuid, CONSTRAINT "REL_8e18a9cefbd560324d29285640" UNIQUE ("usuario_id"), CONSTRAINT "PK_71cca02b9255c76915345714152" PRIMARY KEY ("estudiante_id"))`);
        await queryRunner.query(`CREATE TABLE "carrera" ("carrera_id" SERIAL NOT NULL, "carrera" character varying NOT NULL, "departamento_id" integer, CONSTRAINT "PK_0e0cf8fce00e55d0e49b39169a8" PRIMARY KEY ("carrera_id"))`);
        await queryRunner.query(`CREATE TABLE "pregunta" ("pregunta_id" SERIAL NOT NULL, "pregunta" character varying NOT NULL, CONSTRAINT "PK_3c3f493721b48673b61ef9e1f63" PRIMARY KEY ("pregunta_id"))`);
        await queryRunner.query(`CREATE TYPE "encuesta_modalidad_enum" AS ENUM('obligatoria', 'voluntaria', 'aleatoria')`);
        await queryRunner.query(`CREATE TABLE "encuesta" ("encuesta_id" SERIAL NOT NULL, "modalidad" "encuesta_modalidad_enum" NOT NULL, "otros_sintomas" text, "fecha_aplicacion" TIMESTAMP NOT NULL DEFAULT now(), "usuario_id" uuid, CONSTRAINT "PK_598e1bbe349b40ff0b465914804" PRIMARY KEY ("encuesta_id"))`);
        await queryRunner.query(`CREATE TABLE "medico" ("nombre" character varying NOT NULL, "a_paterno" character varying NOT NULL, "a_materno" character varying NOT NULL, "medico_id" uuid NOT NULL DEFAULT gen_random_uuid(), "rfc" character varying(13) NOT NULL, "cedula" character varying(8) NOT NULL, "usuario_id" uuid, CONSTRAINT "PK_168cbd73fc9655385e48bf1affc" PRIMARY KEY ("medico_id"))`);
        await queryRunner.query(`CREATE TYPE "modalidad_encuesta_modalidad_enum" AS ENUM('obligatoria', 'voluntaria', 'aleatoria')`);
        await queryRunner.query(`CREATE TABLE "modalidad_encuesta" ("id" SERIAL NOT NULL, "modalidad" "modalidad_encuesta_modalidad_enum" NOT NULL, "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_855d3fa41d7d59da375b1583a2b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "multimedia" ("multimedia_id" uuid NOT NULL DEFAULT gen_random_uuid(), "url" character varying NOT NULL, CONSTRAINT "PK_9e94d4f4fb26d1c2ab2a57218f7" PRIMARY KEY ("multimedia_id"))`);
        await queryRunner.query(`CREATE TABLE "tipo_prueba" ("tipo_id" SERIAL NOT NULL, "descripcion" character varying NOT NULL, CONSTRAINT "PK_9b639d359b01dbaf22ae0abb660" PRIMARY KEY ("tipo_id"))`);
        await queryRunner.query(`CREATE TYPE "orden_de_prueba_resultado_enum" AS ENUM('NEGATIVO', 'POSITIVO')`);
        await queryRunner.query(`CREATE TABLE "orden_de_prueba" ("orden_id" uuid NOT NULL DEFAULT gen_random_uuid(), "resultado" "orden_de_prueba_resultado_enum", "usuario_id" uuid, "medico_id" uuid, "tipo_id" integer, CONSTRAINT "PK_8564de4b4d6776e728196a6b4f4" PRIMARY KEY ("orden_id"))`);
        await queryRunner.query(`CREATE TABLE "personal" ("nombre" character varying NOT NULL, "a_paterno" character varying NOT NULL, "a_materno" character varying NOT NULL, "personal_id" uuid NOT NULL DEFAULT gen_random_uuid(), "rfc" character varying NOT NULL, "departamento_id" integer, "usuario_id" uuid, CONSTRAINT "REL_adc1a6cf965a6bd5cfa522324c" UNIQUE ("usuario_id"), CONSTRAINT "PK_5abc77b4bd19c4295cabe6a3bf5" PRIMARY KEY ("personal_id"))`);
        await queryRunner.query(`CREATE TYPE "solicitud_de_consulta_modalidad_enum" AS ENUM('virtual', 'prescencial')`);
        await queryRunner.query(`CREATE TYPE "solicitud_de_consulta_status_enum" AS ENUM('pendiente', 'atendida')`);
        await queryRunner.query(`CREATE TABLE "solicitud_de_consulta" ("solicitud_id" uuid NOT NULL DEFAULT gen_random_uuid(), "sintomas" text NOT NULL, "modalidad" "solicitud_de_consulta_modalidad_enum" NOT NULL, "status" "solicitud_de_consulta_status_enum" NOT NULL DEFAULT 'pendiente', "receta" text, "fecha_solicitud" TIMESTAMP NOT NULL DEFAULT now(), "fecha_atencion" TIMESTAMP, "usuario_id" uuid, "medico_id" uuid, CONSTRAINT "PK_f7404f3be81dee7752b5a80ee81" PRIMARY KEY ("solicitud_id"))`);
        await queryRunner.query(`CREATE TABLE "usuario_rol" ("usuario_id" uuid NOT NULL, "rol_id" integer NOT NULL, CONSTRAINT "PK_40b321ebb932d588934043a2639" PRIMARY KEY ("usuario_id", "rol_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_29e9a9079c7ba01c1b301cf555" ON "usuario_rol" ("usuario_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ac8911cd54a61461c992654140" ON "usuario_rol" ("rol_id") `);
        await queryRunner.query(`CREATE TABLE "encuesta_detalle" ("encuesta_id" integer NOT NULL, "pregunta_id" integer NOT NULL, CONSTRAINT "PK_f99b3a88ae05a1f5e6af3402cbd" PRIMARY KEY ("encuesta_id", "pregunta_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cef0e5f1c2bc6c08fee046e375" ON "encuesta_detalle" ("encuesta_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e922c21aa0f22fafab93093b6a" ON "encuesta_detalle" ("pregunta_id") `);
        await queryRunner.query(`CREATE TABLE "solicitud_multimedia" ("solicitud_id" uuid NOT NULL, "multimedia_id" uuid NOT NULL, CONSTRAINT "PK_2bec0a6d6dcf3f44f39c810de6e" PRIMARY KEY ("solicitud_id", "multimedia_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d2233a0cc2c36ff75e08d3b436" ON "solicitud_multimedia" ("solicitud_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7d0ae6c605746747c38f10594d" ON "solicitud_multimedia" ("multimedia_id") `);
        await queryRunner.query(`ALTER TABLE "alerta" ADD CONSTRAINT "FK_685277b93d533c64f1d0dec58ec" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "estudiante" ADD CONSTRAINT "FK_166c09fb5ec5052fa60176c080e" FOREIGN KEY ("carrera_id") REFERENCES "carrera"("carrera_id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "estudiante" ADD CONSTRAINT "FK_8e18a9cefbd560324d292856406" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "carrera" ADD CONSTRAINT "FK_9178fb28cdc413953d5e56a91c8" FOREIGN KEY ("departamento_id") REFERENCES "departamento"("departamento_id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "encuesta" ADD CONSTRAINT "FK_02f4c1329d7538c91e2322e7e24" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "medico" ADD CONSTRAINT "FK_fa5cd1b5a4c9a5da0c358e92c1c" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" ADD CONSTRAINT "FK_9c18b3fc0215eec13466f077a0b" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" ADD CONSTRAINT "FK_56e60b7d56bef6d763c7cf17de8" FOREIGN KEY ("medico_id") REFERENCES "medico"("medico_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" ADD CONSTRAINT "FK_bd939ccaa0059be46f9247f6f76" FOREIGN KEY ("tipo_id") REFERENCES "tipo_prueba"("tipo_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_0158ddfdae638754a13b4e2a15d" FOREIGN KEY ("departamento_id") REFERENCES "departamento"("departamento_id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_adc1a6cf965a6bd5cfa522324c7" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "solicitud_de_consulta" ADD CONSTRAINT "FK_ecfdf45aca9a8acc51728634096" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solicitud_de_consulta" ADD CONSTRAINT "FK_132a78fc915673f78bf1c2eeba8" FOREIGN KEY ("medico_id") REFERENCES "medico"("medico_id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usuario_rol" ADD CONSTRAINT "FK_29e9a9079c7ba01c1b301cf5555" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_rol" ADD CONSTRAINT "FK_ac8911cd54a61461c9926541401" FOREIGN KEY ("rol_id") REFERENCES "rol"("rol_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "encuesta_detalle" ADD CONSTRAINT "FK_cef0e5f1c2bc6c08fee046e3751" FOREIGN KEY ("encuesta_id") REFERENCES "encuesta"("encuesta_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "encuesta_detalle" ADD CONSTRAINT "FK_e922c21aa0f22fafab93093b6a9" FOREIGN KEY ("pregunta_id") REFERENCES "pregunta"("pregunta_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solicitud_multimedia" ADD CONSTRAINT "FK_d2233a0cc2c36ff75e08d3b436d" FOREIGN KEY ("solicitud_id") REFERENCES "solicitud_de_consulta"("solicitud_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solicitud_multimedia" ADD CONSTRAINT "FK_7d0ae6c605746747c38f10594df" FOREIGN KEY ("multimedia_id") REFERENCES "multimedia"("multimedia_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solicitud_multimedia" DROP CONSTRAINT "FK_7d0ae6c605746747c38f10594df"`);
        await queryRunner.query(`ALTER TABLE "solicitud_multimedia" DROP CONSTRAINT "FK_d2233a0cc2c36ff75e08d3b436d"`);
        await queryRunner.query(`ALTER TABLE "encuesta_detalle" DROP CONSTRAINT "FK_e922c21aa0f22fafab93093b6a9"`);
        await queryRunner.query(`ALTER TABLE "encuesta_detalle" DROP CONSTRAINT "FK_cef0e5f1c2bc6c08fee046e3751"`);
        await queryRunner.query(`ALTER TABLE "usuario_rol" DROP CONSTRAINT "FK_ac8911cd54a61461c9926541401"`);
        await queryRunner.query(`ALTER TABLE "usuario_rol" DROP CONSTRAINT "FK_29e9a9079c7ba01c1b301cf5555"`);
        await queryRunner.query(`ALTER TABLE "solicitud_de_consulta" DROP CONSTRAINT "FK_132a78fc915673f78bf1c2eeba8"`);
        await queryRunner.query(`ALTER TABLE "solicitud_de_consulta" DROP CONSTRAINT "FK_ecfdf45aca9a8acc51728634096"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_adc1a6cf965a6bd5cfa522324c7"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_0158ddfdae638754a13b4e2a15d"`);
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" DROP CONSTRAINT "FK_bd939ccaa0059be46f9247f6f76"`);
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" DROP CONSTRAINT "FK_56e60b7d56bef6d763c7cf17de8"`);
        await queryRunner.query(`ALTER TABLE "orden_de_prueba" DROP CONSTRAINT "FK_9c18b3fc0215eec13466f077a0b"`);
        await queryRunner.query(`ALTER TABLE "medico" DROP CONSTRAINT "FK_fa5cd1b5a4c9a5da0c358e92c1c"`);
        await queryRunner.query(`ALTER TABLE "encuesta" DROP CONSTRAINT "FK_02f4c1329d7538c91e2322e7e24"`);
        await queryRunner.query(`ALTER TABLE "carrera" DROP CONSTRAINT "FK_9178fb28cdc413953d5e56a91c8"`);
        await queryRunner.query(`ALTER TABLE "estudiante" DROP CONSTRAINT "FK_8e18a9cefbd560324d292856406"`);
        await queryRunner.query(`ALTER TABLE "estudiante" DROP CONSTRAINT "FK_166c09fb5ec5052fa60176c080e"`);
        await queryRunner.query(`ALTER TABLE "alerta" DROP CONSTRAINT "FK_685277b93d533c64f1d0dec58ec"`);
        await queryRunner.query(`DROP INDEX "IDX_7d0ae6c605746747c38f10594d"`);
        await queryRunner.query(`DROP INDEX "IDX_d2233a0cc2c36ff75e08d3b436"`);
        await queryRunner.query(`DROP TABLE "solicitud_multimedia"`);
        await queryRunner.query(`DROP INDEX "IDX_e922c21aa0f22fafab93093b6a"`);
        await queryRunner.query(`DROP INDEX "IDX_cef0e5f1c2bc6c08fee046e375"`);
        await queryRunner.query(`DROP TABLE "encuesta_detalle"`);
        await queryRunner.query(`DROP INDEX "IDX_ac8911cd54a61461c992654140"`);
        await queryRunner.query(`DROP INDEX "IDX_29e9a9079c7ba01c1b301cf555"`);
        await queryRunner.query(`DROP TABLE "usuario_rol"`);
        await queryRunner.query(`DROP TABLE "solicitud_de_consulta"`);
        await queryRunner.query(`DROP TYPE "solicitud_de_consulta_status_enum"`);
        await queryRunner.query(`DROP TYPE "solicitud_de_consulta_modalidad_enum"`);
        await queryRunner.query(`DROP TABLE "personal"`);
        await queryRunner.query(`DROP TABLE "orden_de_prueba"`);
        await queryRunner.query(`DROP TYPE "orden_de_prueba_resultado_enum"`);
        await queryRunner.query(`DROP TABLE "tipo_prueba"`);
        await queryRunner.query(`DROP TABLE "multimedia"`);
        await queryRunner.query(`DROP TABLE "modalidad_encuesta"`);
        await queryRunner.query(`DROP TYPE "modalidad_encuesta_modalidad_enum"`);
        await queryRunner.query(`DROP TABLE "medico"`);
        await queryRunner.query(`DROP TABLE "encuesta"`);
        await queryRunner.query(`DROP TYPE "encuesta_modalidad_enum"`);
        await queryRunner.query(`DROP TABLE "pregunta"`);
        await queryRunner.query(`DROP TABLE "carrera"`);
        await queryRunner.query(`DROP TABLE "estudiante"`);
        await queryRunner.query(`DROP TABLE "departamento"`);
        await queryRunner.query(`DROP TABLE "alerta"`);
        await queryRunner.query(`DROP TYPE "alerta_status_enum"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "rol"`);
        await queryRunner.query(`DROP TYPE "rol_rol_enum"`);
    }

}
