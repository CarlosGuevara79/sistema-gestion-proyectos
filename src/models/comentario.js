module.exports = (sequelize, DataTypes) => {
  const Comentario = sequelize.define('Comentario', {
    comentario: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tarea_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'comentarios',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: false
  })

  Comentario.associate = (models) => {
    Comentario.belongsTo(models.Tarea, { foreignKey: 'tarea_id' });
    Comentario.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
  }

  return Comentario;
}
