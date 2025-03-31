
![UDB](https://www.udb.edu.sv/udb_files/content_resource/es//Logo_8.5.jpg)


# Sistema gestion de proyectos 📁📂

Proyecto para la materia DPS desarrollar un sistema de gestión de proyectos utilizando React y Next que permita a los
usuarios registrarse, iniciar sesión y gestionar proyectos y tareas. El sistema debe
interactuar con una API REST para almacenar y recuperar datos. 


## Demo🖥️

#### Aqui puedes ver una demo del funcionamiento😇

https://sistema-gestion-proyectos-xi.vercel.app/ 

###  usuarios para pruebas
ADMIN
user: admin@udb.com 
pass: password
MIEMBRO
user: prueba@udb.com
pass: password

#### Puedes encontrar un documento PDF dentro de los fuentes con el nombre PROYECTO1_GM172474😇

### VIDEO DE EXPLICACION(Coming Soon)😇


## Installation💻

#### Para poder ejecutar el proyecto se recomienda ejecutar lo siguiente 💡

```bash
git clone https://github.com/CarlosGuevara79/sistema-gestion-proyectos.git
cd sistema-gestion-proyectos
```

#### instalar dependencias 
```bash
npm install
```

## Creacion de archivo .env.local

#### si deseas utilizar una base de datos local puedes tomar la base de la carpeta /database que se encuentra en el proyecto y agrega la url de lo que creaste a tu env.local
```bash
DATABASE_URL=postgres://usuario:contraseña@host:puerto/nombre_db
NEXTAUTH_SECRET=una-clave-secreta-segura
```

#### si deseas utilizar la base de datos existente en supabase solo adjunta estos campos en tu .env.local

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/api
DATABASE_URL="postgres://postgres.gkzttocipkgjmeeebijx:pozScSrGMJaYSa2Y@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
NEXTAUTH_SECRET=33962fbb-7f8b-41d4-bdd6-02b4b476f89c
```

### Ejecutar proyecto en modo desarrollo 
```bash
npm run dev
```

## Estructura del proyecto 👨🏾‍💻👨🏾‍💻✍🏾
```yaml
sistema-gestion-proyectos/
├── public/                      # Archivos estáticos (imágenes, íconos, etc.)
├── src/
│   ├── components/              # Componentes reutilizables (Botones, Modales, etc.)
│   │   ├── ui/
│   │   │   ├── BackButton.js
│   │   │   ├── InputField.js
│   │   │   ├── Loading.js
│   │   │   ├── Modal.js  
│   ├── context/                 # Contextos globales
│   │   └── AuthContext.js
│   ├── hooks/                   # Custom hooks
│   │   └── useRequireAuth.js
│   ├── layouts/                 # Layouts como Sidebar o Navbar
│   │   └── SidebarLayout.js
│   ├── models/                  # Modelos Sequelize
│   │   ├── index.js
│   │   ├── usuario.js
│   │   ├── proyecto.js
│   │   ├── tarea.js
│   │   ├── rol.js
│   │   ├── permiso.js
│   │   ├── comentario.js
│   ├── pages/                   # Rutas de la app (Next.js)
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login.js
│   │   │   │   └── registro.js
│   │   │   ├── proyectos/
│   │   │   │   ├── index.js
│   │   │   │   ├── [id].js
│   │   │   │   └── [id]/desasignar.js
│   │   │   ├── tareas/
│   │   │   │   ├── index.js
│   │   │   │   └── [id].js
│   │   │   ├── comentarios/
│   │   │   │   ├── index.js
│   │   │   │   └── [id].js
│   │   │   └── usuarios/
│   │   │       └── index.js
│   │   ├── admin/
│   │   │   └── gestion-roles.js
│   │   ├── dashboard.js
│   │   ├── proyectos/
│   │   │   ├── [id].js
│   │   │   └── crear.js
│   │   ├── tareas/
│   │   │   └── [id].js
│   │   ├── index.js             # Login
│   │   └── registro.js          # Registro
│   ├── services/                # Llamadas a la API (axios)
│   │   ├── auth.js
│   │   ├── proyectos.js
│   │   ├── tareas.js
│   │   ├── comentarios.js
│   │   └── usuarios.js
│   ├── styles/                  # Estilos globales
│   │   └── globals.css
├── .env.local                   # Variables de entorno locales
├── .gitignore
├── next.config.js
├── package.json
├── README.md                    # Documentación del proyecto
└── tailwind.config.js
```


## Authors 👨🏾‍💻👨🏾‍💻✍🏾

- [Carlos David Guevara Martinez GM172474](https://www.github.com/CarlosGuevara79)
una disculpa pero este es mi usuario con el que hice commits aparece cguevara porque realice el proyecto en la pc que tambien trabajo pero mi usuario principal es [@CarlosGuevara79](https://www.github.com/CarlosGuevara79)
