import db from '@/models'

export default async function handler(req, res) {
  await db.sequelize.sync()

  if (req.method === 'GET') {
    const usuarios = await db.Usuario.findAll({
      attributes: ['id', 'nombre','rol_id','email']
    })
    return res.status(200).json(usuarios)
  }

  res.setHeader('Allow', ['GET'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
