import db from '@/models'

export default async function handler(req, res) {
  await db.sequelize.sync()
  const { id } = req.query

  if (req.method === 'POST') {
    const { usuario_id } = req.body

    try {
      const proyecto = await db.Proyecto.findByPk(id)
      const usuario = await db.Usuario.findByPk(usuario_id)

      if (!proyecto || !usuario) {
        return res.status(404).json({ error: 'Proyecto o usuario no encontrado' })
      }

      console.log('Asignando usuario:  ', usuario_id, 'al proyecto: ', id)

      await proyecto.addUsuario(usuario)

      return res.status(200).json({ mensaje: 'Usuario asignado correctamente ' })

    } catch (error) {
      console.error('Error al asignar usuario al proyecto:', error)
      return res.status(500).json({ error: 'Error al asignar usuario al proyecto', detalle: error.message })
    }
  }

  res.setHeader('Allow', ['POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
