module.exports = (sequelize, DataTypes) => {
    const Permiso = sequelize.define('Permiso', {
      nombre: {
        type: DataTypes.STRING,
        unique: true
      }
    }, { tableName: 'permisos', timestamps: false });
  
    return Permiso;
  };
  