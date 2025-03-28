module.exports = (sequelize, DataTypes) => {
  const Rol = sequelize.define('Rol', {
    nombre: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {
    tableName: 'roles',
    timestamps: false,
  });

  Rol.associate = models => {
    Rol.hasMany(models.Usuario, { foreignKey: 'rol_id' });
    Rol.belongsToMany(models.Permiso, {
      through: 'roles_permisos',
      foreignKey: 'rol_id',
    });
  };

  return Rol;
};