module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    rol_id: {
      type: DataTypes.INTEGER,
      defaultValue: 3 // Miembro por defecto
    }
  }, {
    tableName: 'usuarios', 
    timestamps: true,
    createdAt: 'creado_en',  // Indica claramente el nombre correcto
    updatedAt: false,
  },
  );

  Usuario.associate = models => {
    Usuario.belongsTo(models.Rol, { foreignKey: 'rol_id' });
    Usuario.hasMany(models.Proyecto, { foreignKey: 'creado_por' });
    Usuario.hasMany(models.Tarea, { foreignKey: 'asignado_a' });
    Usuario.hasMany(models.Comentario, { foreignKey: 'usuario_id' });
    Usuario.belongsToMany(models.Proyecto, {
      through: 'usuarios_proyectos',
      foreignKey: 'usuario_id',
      otherKey: 'proyecto_id'
    })
  };

  return Usuario;
};
