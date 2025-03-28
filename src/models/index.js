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

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
export { sequelize, Sequelize }
