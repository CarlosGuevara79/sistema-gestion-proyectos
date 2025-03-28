module.exports = (sequelize, DataTypes) => {
  const Permiso = sequelize.define('Permiso', {
    nombre: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {
    tableName: 'permisos',
    timestamps: false,
  });

  Permiso.associate = models => {
    Permiso.belongsToMany(models.Rol, {
      through: 'roles_permisos',
      foreignKey: 'permiso_id',
    });
  };

  return Permiso;
};
  