export default (sequelize, DataTypes) => {
    const Rol = sequelize.define('Rol', {
      nombre: {
        type: DataTypes.STRING,
        unique: true
      }
    }, { tableName: 'roles', timestamps: false });
  
    return Rol;
  };
  