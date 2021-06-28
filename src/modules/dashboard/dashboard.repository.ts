import { getConnection } from 'typeorm'
export class DashboardRepository {
  //Total de medicos registrados
  async getNumMedicos(): Promise<number> {
    const sql = 'select count(*) from medico; '
    const resp = await getConnection().query(sql)
    return Number(resp[0].count)
  }

  //Total de estudiantes registrados
  async getNumEstudiantes(): Promise<number> {
    const sql = 'select count(*) from estudiante; '
    const resp = await getConnection().query(sql)
    return Number(resp[0].count)
  }

  //Total de Personal
  async getNumPersonal(): Promise<number> {
    const sql = 'select count(*) from personal; '
    const resp = await getConnection().query(sql)
    return Number(resp[0].count)
  }

  //Total de encuestas
  async getTotalEncuestas(): Promise<number> {
    const sql = 'select count(*) from encuesta; '
    const resp = await getConnection().query(sql)
    return Number(resp[0].count)
  }

  //Total de consultas atendidas
  async getTotalConsultas(): Promise<number> {
    const sql = `select count(*) from solicitud_de_consulta where status = 'atendida'`
    const resp = await getConnection().query(sql)
    return Number(resp[0].count)
  }

  //Numero de encuestas
  async getNumEncuestas(): Promise<number> {
    const sql = `select count(*) from encuesta`
    const resp = await getConnection().query(sql)
    return Number(resp[0].count)
  }

  //Numero de pruebas aplicadas, es decir, con resultado
  async getNumOrdenes(): Promise<number> {
    const sql = `select count(*) from orden_de_prueba where resultado is not null`
    const resp = await getConnection().query(sql)
    return Number(resp[0].count)
  }

  //Numero de pruebas positivas
  async getNumPositivos(): Promise<number> {
    const sql = `select count(*) from orden_de_prueba where resultado = 'POSITIVO'`
    const resp = await getConnection().query(sql)
    return Number(resp[0].count)
  }

  //Numero de sospechosos
  async getNumSospechosos(): Promise<number> {
    const sql = `select count(*) from usuario where sospechoso = true;`
    const resp = await getConnection().query(sql)
    return Number(resp[0].count)
  }

  //Obtener todos los contagios del ultimo mes
  async getContagios(): Promise<any[]> {
    const sql = `
    select * from orden_de_prueba 
    where fecha_deteccion > (now() - interval '30 days') and resultado = 'POSITIVO'
    `
    const resp = await getConnection().query(sql)
    return resp
  }

  //Consultas atendidas en el ultimo mes
  async getConsultas(): Promise<any[]> {
    const sql = `
    select * from solicitud_de_consulta 
    where fecha_atencion > (now() - interval '30 days') and status = 'atendida'
    `
    const resp = await getConnection().query(sql)
    return resp
  }
}
