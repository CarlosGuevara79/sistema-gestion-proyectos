module.exports =  (sequelize, DataTypes) =>  {
    const Tarea = sequelize.define('Tarea', {
      titulo: DataTypes.STRING,
      descripcion: DataTypes.TEXT,
      estado: { 
        type: DataTypes.STRING,
        defaultValue: 'pendiente'
      },
      fecha_limite: DataTypes.DATEONLY
    }, { 
      tableName: 'tareas',
      timestamps: true,
      createdAt: 'creado_en',  
      updatedAt: false,        // Si no tienes updatedAt
     });
  
    Tarea.associate = models => {
      Tarea.belongsTo(models.Proyecto, { foreignKey: 'proyecto_id' });
      Tarea.belongsTo(models.Usuario, { foreignKey: 'asignado_a' });
      Tarea.hasMany(models.Comentario, { foreignKey: 'tarea_id' });
    };
  
    return Tarea;
  };
  