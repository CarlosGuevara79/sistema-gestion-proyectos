CREATE DATABASE gestion_proyectos;
CREATE USER admin WITH PASSWORD 'admin123';
GRANT ALL PRIVILEGES ON DATABASE gestion_proyectos TO admin;
\q

psql -U admin -d gestion_proyectos


-- Tabla Roles
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE
);

-- Tabla Usuarios
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  rol_id INTEGER REFERENCES roles(id), -- nuevo campo
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Permisos
CREATE TABLE permisos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE
);

-- Tabla intermedia: Roles ↔ Permisos
CREATE TABLE roles_permisos (
  rol_id INTEGER REFERENCES roles(id),
  permiso_id INTEGER REFERENCES permisos(id),
  PRIMARY KEY (rol_id, permiso_id)
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

-- Relación muchos a muchos: Usuarios ↔ Proyectos
CREATE TABLE usuarios_proyectos (
  usuario_id INTEGER REFERENCES usuarios(id),
  proyecto_id INTEGER REFERENCES proyectos(id),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  PRIMARY KEY(usuario_id, proyecto_id)
);

-- Comentarios sobre tareas
CREATE TABLE comentarios (
  id SERIAL PRIMARY KEY,
  tarea_id INTEGER REFERENCES tareas(id),
  usuario_id INTEGER REFERENCES usuarios(id),
  comentario TEXT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar roles
INSERT INTO roles (nombre) VALUES ('Administrador'), ('Gerente'), ('Miembro');

-- Insertar permisos (según tu lógica)
INSERT INTO permisos (nombre) VALUES
('crear_proyectos'),
('editar_proyectos'),
('eliminar_proyectos'),
('asignar_tareas'),
('editar_tareas'),
('ver_todo');

-- Ejemplo: asignar todos los permisos al Administrador (rol_id = 1)
INSERT INTO roles_permisos (rol_id, permiso_id)
SELECT 1, id FROM permisos;


-- verificar TABLA
\dt