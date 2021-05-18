import { NextFunction, Request, Response } from 'express'
import { ErrorHandler } from '../../middlewares/error_handler'
import { ModalidadEnum, ModalidadEncuesta } from '../../entities'
import { getConnection, getRepository } from 'typeorm'

export async function changeModality(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { modalidad } = req.body

  try {
    const newModalidad = new ModalidadEncuesta()
    newModalidad.modalidad = modalidad
    const saved = await getRepository(ModalidadEncuesta).save(newModalidad)

    await getConnection().query('update usuario set requireSuvey=false')

    const sql = {
      [ModalidadEnum.ALEATORIA]:
        'update usuario set requireSuvey=true where rand() > 0.5',
      [ModalidadEnum.OBLIGATORIA]: 'update usuario set requireSuvey=true',
      [ModalidadEnum.VOLUNTARIA]: 'update usuario set requireSuvey=false',
    }

    const query = sql[modalidad as ModalidadEnum]
    await getConnection().query(query)

    res.json({
      modalidad: saved,
    })
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

export async function getModality(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const modalidad = await getRepository(ModalidadEncuesta).find({
      order: { id: 'DESC' },
      take: 1,
    })
    if (modalidad.length > 0) {
      res.json({ modalidad: modalidad[0] })
    } else {
      const modalidad = new ModalidadEncuesta()
      modalidad.modalidad = ModalidadEnum.VOLUNTARIA
      const saved = await getRepository(ModalidadEncuesta).save(modalidad)
      res.json({ modalidad: saved })
    }
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}
