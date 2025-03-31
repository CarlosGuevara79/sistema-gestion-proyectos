import { Sequelize, DataTypes } from 'sequelize'

import UsuarioModel from './usuario.js'
import ProyectoModel from './proyecto.js'
import TareaModel from './tarea.js'
import RolModel from './rol.js'
import PermisoModel from './permiso.js'
import ComentarioModel from './comentario.js'

const isProduction = process.env.NODE_ENV === 'production'
const dbUrl = process.env.DATABASE_URL

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  dialectModule: require('pg'), // 👈 asegura que usa el módulo correcto
  logging: false,
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    : {} // 👈 en local, sin SSL
})

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

// Asociaciones
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
