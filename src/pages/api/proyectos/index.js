import db from '@/models';

export default async function handler(req, res) {
  await db.sequelize.sync();

  if (req.method === 'GET') {
    const proyectos = await db.Proyecto.findAll();
    res.status(200).json(proyectos);
  }

  if (req.method === 'POST') {
    const proyecto = await db.Proyecto.create(req.body);
    res.status(201).json(proyecto);
  }
}
