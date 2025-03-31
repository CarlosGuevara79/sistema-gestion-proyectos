import db from '@/models'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  await db.sequelize.sync()

  if (req.method === 'GET') {
    const usuarios = await db.Usuario.findAll({
      attributes: ['id', 'nombre','rol_id','email']
    })
    return res.status(200).json(usuarios)
  }

  if (req.method === 'POST') {
    try {
      const { nombre, email, password, rol } = req.body
  
      const rolEncontrado = await db.Rol.findOne({ where: { nombre: rol } })
      if (!rolEncontrado) {
        return res.status(400).json({ error: 'Rol no válido' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)


      const nuevoUsuario = await db.Usuario.create({
        nombre,
        email,
        password: hashedPassword,
        rol_id: rolEncontrado.id
      })
  
      return res.status(201).json(nuevoUsuario)
    } catch (error) {
      console.error('Error al crear usuario:', error)
      return res.status(500).json({ error: 'Error al crear usuario' })
    }
  }

  res.setHeader('Allow', ['GET','POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
