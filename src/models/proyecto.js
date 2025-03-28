module.exports =  (sequelize, DataTypes) => {
  const Proyecto = sequelize.define('Proyecto', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    fecha_inicio: DataTypes.DATEONLY,
    fecha_fin: DataTypes.DATEONLY,
    creado_por: DataTypes.INTEGER,
  }, { 
    tableName: 'proyectos',
    timestamps: true,
    createdAt: 'creado_en',  // Indica claramente el nombre correcto
    updatedAt: false,        // Si no tienes updatedAt
  });

  Proyecto.associate = models => {
    Proyecto.belongsTo(models.Usuario, { foreignKey: 'creado_por' });
    Proyecto.hasMany(models.Tarea, { foreignKey: 'proyecto_id' });
    Proyecto.belongsToMany(models.Usuario, {
      through: 'usuarios_proyectos',
      foreignKey: 'proyecto_id',
      otherKey: 'usuario_id'
    })
  };

  return Proyecto;
};
