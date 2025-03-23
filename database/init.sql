CREATE DATABASE gestion_proyectos;
CREATE USER admin WITH PASSWORD 'admin123';
GRANT ALL PRIVILEGES ON DATABASE gestion_proyectos TO admin;
\q

psql -U admin -d gestion_proyectos

-- Tabla Usuarios
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Proyectos
CREATE TABLE proyectos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  descripcion TEXT,
  fecha_inicio DATE,
  fecha_fin DATE,
  creado_por INTEGER REFERENCES usuarios(id),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Tareas
CREATE TABLE tareas (
  id SERIAL PRIMARY KEY,
  proyecto_id INTEGER REFERENCES proyectos(id),
  titulo VARCHAR(100),
  descripcion TEXT,
  estado VARCHAR(50) DEFAULT 'pendiente',
  asignado_a INTEGER REFERENCES usuarios(id),
  fecha_limite DATE,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Roles
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE
);

-- Tabla Permisos
CREATE TABLE permisos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE
);

-- Relación muchos a muchos usuarios-proyectos
CREATE TABLE usuarios_proyectos (
  usuario_id INTEGER REFERENCES usuarios(id),
  proyecto_id INTEGER REFERENCES proyectos(id),
  PRIMARY KEY(usuario_id, proyecto_id)
);

-- Tabla Comentarios (para tareas)
CREATE TABLE comentarios (
  id SERIAL PRIMARY KEY,
  tarea_id INTEGER REFERENCES tareas(id),
  usuario_id INTEGER REFERENCES usuarios(id),
  comentario TEXT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- verificar TABLA
\dt