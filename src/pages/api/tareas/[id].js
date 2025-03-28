import db from '@/models'

export default async function handler(req, res) {
  await db.sequelize.sync();
  const { method, query: { id }, body } = req
  const { Tarea } = db;

  try {
    const tarea = await Tarea.findByPk(id)

    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' })

    if (method === 'GET') {
      return res.status(200).json(tarea)
    }

    if (method === 'PUT') {
      await tarea.update(body)
      return res.status(200).json(tarea)
    }

    if (method === 'DELETE') {
      await tarea.destroy()
      return res.status(204).end()
    }

    return res.status(405).end(`Method ${method} Not Allowed`)
  } catch (error) {
    console.error('Error en /api/tareas/[id]:', error)
    return res.status(500).json({ error: 'Error del servidor' })
  }
}
