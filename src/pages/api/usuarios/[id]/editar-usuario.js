import db from '@/models'

export default async function handler(req, res) {
  const { id } = req.query
  const { rol, email } = req.body

  await db.sequelize.sync()
  const { Usuario, Rol } = db

  if (req.method === 'PUT') {
    try {
      const usuario = await Usuario.findByPk(id)
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
      }

      // Actualización del rol si es necesario
      if (rol) {
        const rolEncontrado = await Rol.findOne({ where: { nombre: rol } })
        if (!rolEncontrado) {
          return res.status(404).json({ error: 'Rol no encontrado' })
        }
        usuario.rol_id = rolEncontrado.id
      }

      // Actualización del email claramente
      if (email) {
        usuario.email = email.trim().toLowerCase()
      }

      await usuario.save()

      return res.status(200).json({ mensaje: 'Usuario actualizado exitosamente' })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Error del servidor', detalle: error.message })
    }
  }

  return res.status(405).json({ mensaje: 'Método no permitido' })
}
