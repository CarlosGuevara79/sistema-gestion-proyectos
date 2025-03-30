
![UDB](https://www.udb.edu.sv/udb_files/content_resource/es//Logo_8.5.jpg)


# Sistema gestion de proyectos 📁📂

Proyecto para la materia DPS desarrollar un sistema de gestión de proyectos utilizando React y Next que permita a los
usuarios registrarse, iniciar sesión y gestionar proyectos y tareas. El sistema debe
interactuar con una API REST para almacenar y recuperar datos. 
## Installation💻

#### Para poder ejecutar el proyecto se recomienda ejecutar lo siguiente 💡

```bash
git clone https://github.com/CarlosGuevara79/sistema-gestion-proyectos.git
cd sistema-gestion-proyectos
```

#### instalar dependencias 💡
```bash
npm install
```

## Creacion de archivo .env.local💡

#### si deseas utilizar una base de datos local puedes tomar la base de la carpeta /database que se encuentra en el proyecto y agrega la url de lo que creaste a tu env.local💡
```bash
DATABASE_URL=postgres://usuario:contraseña@host:puerto/nombre_db
NEXTAUTH_SECRET=una-clave-secreta-segura
```

#### si deseas utilizar la base de datos existente en supabase solo adjunta estos campos en tu .env.local💡

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/api
DATABASE_URL="postgres://postgres.gkzttocipkgjmeeebijx:pozScSrGMJaYSa2Y@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
NEXTAUTH_SECRET=33962fbb-7f8b-41d4-bdd6-02b4b476f89c
```



## Authors 👨🏾‍💻👨🏾‍💻✍🏾

- [Carlos David Guevara Martinez GM172474](https://www.github.com/CarlosGuevara79)
una disculpa pero este es mi usuario con el que hice commits aparece cguevara porque realice el proyecto en la pc que tambien trabajo pero mi usuario principal es [@CarlosGuevara79](https://www.github.com/CarlosGuevara79)

## Demo🖥️

#### Aqui puedes ver una demo del funcionamiento😇

https://sistema-gestion-proyectos-xi.vercel.app/
