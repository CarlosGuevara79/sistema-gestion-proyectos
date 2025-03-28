import db from '@/models'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  await db.sequelize.sync()

  if (req.method === 'POST') {
    const { email, password } = req.body

    const usuario = await db.Usuario.findOne({
      where: { email },
      include: db.Rol // agregar el rol a la consulta
    })

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    const match = await bcrypt.compare(password, usuario.password)
    if (!match) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }
    const { id, nombre, rol_id, Rol } = usuario
    return res.status(200).json({ id, nombre, email, rol_id, rol: Rol?.nombre })
  }

  res.setHeader('Allow', ['POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
