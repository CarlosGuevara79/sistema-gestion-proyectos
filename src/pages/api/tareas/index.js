import db from '@/models'

export default async function handler(req, res) {
  const { method, query, body } = req
  await db.sequelize.sync()
  const { Tarea } = db

  try {
    if (method === 'GET') {
      const { proyecto_id } = query

      const tareas = proyecto_id
        ? await Tarea.findAll({ where: { proyecto_id } })
        : await Tarea.findAll()

      return res.status(200).json(tareas)
    }

    if (method === 'POST') {
      const tarea = await Tarea.create(body)
      return res.status(201).json(tarea)
    }

    return res.status(405).end(`Method ${method} Not Allowed`)
  } catch (error) {
    console.error('Error en /api/tareas:', error)
    return res.status(500).json({ error: 'Error del servidor' })
  }
}
