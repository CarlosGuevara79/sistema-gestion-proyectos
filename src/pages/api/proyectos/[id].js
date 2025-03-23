import db from '@/models';

export default async function handler(req, res) {
  await db.sequelize.sync();

  const { id } = req.query;
  const { Proyecto } = db;

  if (req.method === 'GET') {
    const proyecto = await Proyecto.findByPk(id);
    if (!proyecto) return res.status(404).json({ error: 'No encontrado' });
    return res.status(200).json(proyecto);
  }

  if (req.method === 'PUT') {
    await Proyecto.update(req.body, { where: { id } });
    const actualizado = await Proyecto.findByPk(id);
    return res.status(200).json(actualizado);
  }

  if (req.method === 'DELETE') {
    await Proyecto.destroy({ where: { id } });
    return res.status(204).end();
  }
}
