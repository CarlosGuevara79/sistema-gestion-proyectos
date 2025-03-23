module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
      nombre: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING
    }, { tableName: 'usuarios', timestamps: true });
  
    Usuario.associate = models => {
      Usuario.hasMany(models.Proyecto, { foreignKey: 'creado_por' });
      Usuario.hasMany(models.Tarea, { foreignKey: 'asignado_a' });
      Usuario.belongsToMany(models.Proyecto, {
        through: 'usuarios_proyectos',
        foreignKey: 'usuario_id'
      });
      Usuario.hasMany(models.Comentario, { foreignKey: 'usuario_id' });
    };
  
    return Usuario;
  };
  