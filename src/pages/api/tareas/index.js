import db from '@/models';

export default async function handler(req, res) {
  await db.sequelize.sync();

  if (req.method === 'GET') {
    const tareas = await db.Tarea.findAll();
    res.status(200).json(tareas);
  }

  if (req.method === 'POST') {
    const tarea = await db.Tarea.create(req.body);
    res.status(201).json(tarea);
  }
}
