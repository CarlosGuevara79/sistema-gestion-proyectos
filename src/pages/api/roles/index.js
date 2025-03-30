import db from '@/models'

export default async function handler(req, res) {
  await db.sequelize.sync()
  const roles = await db.Rol.findAll()
  res.status(200).json(roles)
}
