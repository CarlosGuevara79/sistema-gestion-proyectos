import db from '@/models'

export default async function handler(req, res) {
  await db.sequelize.sync()

  if (req.method === 'GET') {
    const usuarios = await db.Usuario.findAll({
      attributes: ['id', 'nombre','rol_id','email']
    })
    return res.status(200).json(usuarios)
  }

  if (req.method === 'POST') {
    const usuario = await db.Usuario.create(req.body)
    return res.status(201).json(usuario)
  }

  res.setHeader('Allow', ['GET','POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
