import db from '@/models';

export default async function handler(req, res) {
  await db.sequelize.sync();

  if (req.method === 'GET') {
    try {
      const proyectos = await db.Proyecto.findAll({
        include: [
          {
            model: db.Usuario,
            through: { attributes: [] }, 
            attributes: ['id', 'nombre', 'email'] 
          }
        ]
      });

      res.status(200).json(proyectos);
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      res.status(500).json({ error: 'Error al obtener proyectos' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }

  if (req.method === 'POST') {
    const proyecto = await db.Proyecto.create(req.body);
    res.status(201).json(proyecto);
  }
}
