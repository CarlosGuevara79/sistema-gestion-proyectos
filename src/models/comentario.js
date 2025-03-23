module.exports = (sequelize, DataTypes) => {
    const Comentario = sequelize.define('Comentario', {
      comentario: DataTypes.TEXT
    }, { tableName: 'comentarios', timestamps: true });
  
    Comentario.associate = models => {
      Comentario.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
      Comentario.belongsTo(models.Tarea, { foreignKey: 'tarea_id' });
    };
  
    return Comentario;
  };
  