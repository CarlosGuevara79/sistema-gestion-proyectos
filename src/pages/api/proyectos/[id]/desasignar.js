import db from '@/models'

export default async function handler(req, res) {
  const { id: proyectoId } = req.query
  const { usuario_id } = req.body

  await db.sequelize.sync()

  const { Usuarios_Proyectos } = db

  if (req.method === 'POST') {
    try {
      const eliminado = await Usuarios_Proyectos.destroy({
        where: {
          proyecto_id: proyectoId,
          usuario_id: usuario_id,
        },
      })

      if (eliminado === 0) {
        return res.status(404).json({ error: 'Relación no encontrada' })
      }

      return res.status(200).json({ mensaje: 'Usuario desasignado exitosamente' })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Error del servidor', detalles: error.message })
    }
  }

  return res.status(405).json({ mensaje: 'Método no permitido' })
}
