import db from '@/models'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  await db.sequelize.sync()

  if (req.method === 'POST') {
    const { nombre, email, password } = req.body
    try {
      const existe = await db.Usuario.findOne({ where: { email } })
      if (existe) return res.status(400).json({ error: 'Usuario ya registrado' })

      const hashedPassword = await bcrypt.hash(password, 10)

      const nuevoUsuario = await db.Usuario.create({
        nombre,
        email,
        password: hashedPassword,
        rol_id: 3
      })

      return res.status(201).json(nuevoUsuario)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Error al registrar usuario' })
    }
  }

  res.setHeader('Allow', ['POST'])
  // res.status(405).end(`Method ${req.method} Not Allowed`)
}
