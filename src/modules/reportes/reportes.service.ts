import { getConnection } from 'typeorm'
import { Carrera, Departamento } from '../../entities'

export class ReportesService {
  async getCasosDetectados() {
    const conn = getConnection()
    const estudiantes = await conn.query(
      `select concat_ws(' ',e.nombre,e.a_paterno,e.a_materno) as estudiante,
      	op.fecha_deteccion,
      	op.resultado,
      	c.carrera
      from usuario u
      	join estudiante e on e.usuario_id = u.usuario_id
      	join orden_de_prueba op on op.usuario_id = u.usuario_id
      	join carrera c on c.carrera_id = e.carrera_id
      where op.resultado = 'POSITIVO'`
    )

    const personal = await conn.query(
      `select concat_ws(' ',p.nombre,p.a_paterno,p.a_materno) as personal,
        op.fecha_deteccion,
        op.resultado,
        d.departamento
      from usuario u
        join personal p on p.usuario_id = u.usuario_id
        join orden_de_prueba op on op.usuario_id = u.usuario_id
        join departamento d on d.departamento_id = p.departamento_id
      where op.resultado = 'POSITIVO';`
    )

    return { estudiantes, personal }
  }

  async getTotalCasos() {
    const conn = getConnection()

    const carreras = await conn.manager
      .getRepository(Carrera)
      .find({ select: ['carrera'] })
    const departamentos = await conn.manager
      .getRepository(Departamento)
      .find({ select: ['departamento'] })

    const total_carrera: any[] = await conn.query(
      `select c.carrera, count(*) as total_estudiantes
      from usuario u
      	join estudiante e on e.usuario_id = u.usuario_id
      	join orden_de_prueba op on op.usuario_id = u.usuario_id
      	join carrera c on c.carrera_id = e.carrera_id
      where op.resultado = 'POSITIVO'
      group by c.carrera`
    )

    carreras.forEach((row) => {
      if (!total_carrera.find((c) => c.carrera === row.carrera)) {
        total_carrera.push({ carrera: row.carrera, total_estudiantes: 0 })
      }
    })

    const total_departamento: any[] = await conn.query(
      `select d.departamento, count(*) as total_personal
      from usuario u
        join personal p on p.usuario_id = p.usuario_id
        join orden_de_prueba op on op.usuario_id = u.usuario_id
        join departamento d on d.departamento_id = p.departamento_id
      where op.resultado = 'POSITIVO'
      group by d.departamento`
    )

    departamentos.forEach((row) => {
      if (
        !total_departamento.find((d) => d.departamento === row.departamento)
      ) {
        total_departamento.push({
          departamento: row.departamento,
          total_personal: 0,
        })
      }
    })

    return { carrera: total_carrera, departamento: total_departamento }
  }

  async getTotalncuestas() {
    const conn = getConnection()

    const carreras = await conn.manager
      .getRepository(Carrera)
      .find({ select: ['carrera'] })
    const departamentos = await conn.manager
      .getRepository(Departamento)
      .find({ select: ['departamento'] })

    const total_carrera: any[] = await conn.query(
      `select c.carrera, count(*) as total_encuestas
      from usuario u
        join estudiante e on e.usuario_id = u.usuario_id
        join carrera c on c.carrera_id = e.carrera_id
        join encuesta en on en.usuario_id = u.usuario_id
      group by c.carrera`
    )

    carreras.forEach((row) => {
      if (!total_carrera.find((c) => c.carrera === row.carrera)) {
        total_carrera.push({ carrera: row.carrera, total_encuestas: 0 })
      }
    })

    const total_departamento: any[] = await conn.query(
      `select d.departamento, count(*) as total_encuestas
      from usuario u
        join personal p on p.usuario_id = u.usuario_id
        join departamento d on d.departamento_id = p.departamento_id
        join encuesta en on en.usuario_id = u.usuario_id
      group by d.departamento`
    )

    departamentos.forEach((row) => {
      if (
        !total_departamento.find((d) => d.departamento === row.departamento)
      ) {
        total_departamento.push({
          departamento: row.departamento,
          total_encuestas: 0,
        })
      }
    })

    return { carrera: total_carrera, departamento: total_departamento }
  }

  async getTotalConsultas() {
    const consultas = await getConnection().query(
      `select concat_ws(' ',m.nombre,m.a_paterno,m.a_materno) as medico, count(*) as total_consultas
      from usuario u
        join medico m on u.usuario_id = m.usuario_id
        join solicitud_de_consulta sc on sc.medico_id = m.medico_id
      group by medico`
    )
    return { consultas }
  }
}
