import db from '@/models'

export default async function handler(req, res) {
  await db.sequelize.sync()
  const { id } = req.query

  if (req.method === 'GET') {
    const usuarios = await db.Usuario.findAll({
      include: {
        model: db.Proyecto,
        where: { id },
        through: { attributes: [] } // Evita mostrar datos de la tabla intermedia
      },
      attributes: ['id', 'nombre']
    })

    return res.status(200).json(usuarios)
  }

  res.setHeader('Allow', ['GET'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
