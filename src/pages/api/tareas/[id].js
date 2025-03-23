import { Tarea, sequelize } from '@/models';

export default async function handler(req, res) {
  const { id } = req.query;
  await sequelize.sync();

  if (req.method === 'GET') {
    const tarea = await Tarea.findByPk(id);
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.status(200).json(tarea);
  }

  if (req.method === 'PUT') {
    await Tarea.update(req.body, { where: { id } });
    const tarea = await Tarea.findByPk(id);
    res.status(200).json(tarea);
  }

  if (req.method === 'DELETE') {
    await Tarea.destroy({ where: { id } });
    res.status(204).end();
  }
}
