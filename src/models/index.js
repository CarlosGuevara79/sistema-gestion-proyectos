import { Sequelize, DataTypes } from 'sequelize'
import configFile from '../../config/config.js'

import UsuarioModel from './usuario.js'
import ProyectoModel from './proyecto.js'
import TareaModel from './tarea.js'
import RolModel from './rol.js'
import PermisoModel from './permiso.js'
import ComentarioModel from './comentario.js'

const env = process.env.NODE_ENV || 'development'
const config = configFile[env]

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

const db = {
  Usuario: UsuarioModel(sequelize, DataTypes),
  Proyecto: ProyectoModel(sequelize, DataTypes),
  Tarea: TareaModel(sequelize, DataTypes),
  Rol: RolModel(sequelize, DataTypes),
  Permiso: PermisoModel(sequelize, DataTypes),
  Comentario: ComentarioModel(sequelize, DataTypes),
}

// Tabla intermedia claramente definida
const Usuarios_Proyectos = sequelize.define('usuarios_proyectos', {
  usuario_id: {
    type: DataTypes.INTEGER,
    references: { model: 'usuarios', key: 'id' },
  },
  proyecto_id: {
    type: DataTypes.INTEGER,
    references: { model: 'proyectos', key: 'id' },
  }
}, {
  timestamps: false,
  tableName: 'usuarios_proyectos'
})

db.Usuarios_Proyectos = Usuarios_Proyectos

// Asociaciones claras y correctas:
db.Usuario.belongsToMany(db.Proyecto, { through: Usuarios_Proyectos, foreignKey: 'usuario_id' })
db.Proyecto.belongsToMany(db.Usuario, { through: Usuarios_Proyectos, foreignKey: 'proyecto_id' })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
export { sequelize, Sequelize }