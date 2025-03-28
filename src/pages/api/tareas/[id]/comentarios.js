import db from '@/models'

export default async function handler(req, res) {
  const { method, query: { id } } = req
  const { Comentario } = db

  try {
    if (method === 'GET') {
      const comentarios = await Comentario.findAll({
        where: { tarea_id: id },
        include: { model: db.Usuario, attributes: ['id', 'nombre','creado_en'] },
        order: [['creado_en', 'DESC']]
      })
      return res.status(200).json(comentarios)
    }
    return res.status(405).end(`Method ${method} Not Allowed`)
  } catch (error) {
    console.error('Error en /api/tareas/[id]/comentarios:', error)
    return res.status(500).json({ error: 'Error del servidor' })
  }
}
