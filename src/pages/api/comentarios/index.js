import db from '@/models'

export default async function handler(req, res) {
  const { method, query, body } = req
  const { Comentario } = db

  try {
    if (method === 'GET') {
      const { tarea_id } = query

      if (!tarea_id) return res.status(400).json({ error: 'Falta tarea_id' })

      const comentarios = await Comentario.findAll({
        where: { tarea_id },
        include: { model: db.Usuario, attributes: ['id', 'nombre'] }
      })

      return res.status(200).json(comentarios)
    }

    if (method === 'POST') {
      const comentario = await Comentario.create(body)
      return res.status(201).json(comentario)
    }

    return res.status(405).end(`Method ${method} Not Allowed`)
  } catch (error) {
    console.error('Error en /api/comentarios:', error)
    return res.status(500).json({ error: 'Error del servidor' })
  }
}
