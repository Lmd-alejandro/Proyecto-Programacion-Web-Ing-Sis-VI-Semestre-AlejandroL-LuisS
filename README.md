# MyTeacher 📚

Plataforma web para la búsqueda y reserva de tutores académicos.

Proyecto desarrollado para la asignatura de Programación Web - Ingeniería de Sistemas VI semestre.

---

# Integrantes 👨‍💻

- Alejandro Lamadrid
- Luis Sarmiento

---

# Tecnologías utilizadas 🚀

## Frontend
- HTML5
- CSS3
- JavaScript

## Backend
- Node.js
- Express.js

## Base de datos
- MySQL

---

# Funcionalidades principales ✅

## Usuarios estudiantes
- Registro de cuenta
- Inicio de sesión
- Visualización de tutores
- Reserva de clases
- Visualización de reservas realizadas
- Filtros de búsqueda

## Administrador
- Crear tutores
- Editar tutores
- Eliminar tutores
- Visualizar reservas

---

# Estructura del proyecto 📁

```bash
MyTeacher/
│
├── backend/
│   ├── routes/
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── principal.html
│   ├── admin.html
│   ├── script.js
│   └── style.css
│
└── README.md
```

---

# Instalación del proyecto ⚙️

## 1. Clonar el repositorio

```bash
git clone https://github.com/Lmd-alejandro/Proyecto-Programacion-Web-Ing-Sis-VI-Semestre-AlejandroL-LuisS.git
```

---

## 2. Abrir la carpeta del proyecto

```bash
cd Proyecto-Programacion-Web-Ing-Sis-VI-Semestre-AlejandroL-LuisS
```

---

# Configuración de MySQL 🛢️

## Crear base de datos

Abrir MySQL Workbench y ejecutar:

```sql
CREATE DATABASE myteacher;
```

---

## Crear tabla usuarios

```sql
USE myteacher;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    correo VARCHAR(100),
    password VARCHAR(255),
    rol ENUM('admin','usuario') DEFAULT 'usuario'
);
```

---

## Crear tabla tutores

```sql
CREATE TABLE tutores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    materia VARCHAR(100),
    ciudad VARCHAR(100),
    precio VARCHAR(100),
    descripcion TEXT,
    imagen TEXT
);
```

---

## Crear tabla reservas

```sql
CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estudiante VARCHAR(100),
    tutor VARCHAR(100),
    fecha VARCHAR(50),
    hora VARCHAR(50)
);
```

---

# Configuración del backend 🔧

Entrar a la carpeta backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

---

# Configurar archivo .env

Crear un archivo llamado:

```bash
.env
```

Y colocar:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=TU_PASSWORD

DB_NAME=myteacher

JWT_SECRET=myteachersecret
```

⚠️ Reemplazar:

```env
TU_PASSWORD
```

por la contraseña personal de MySQL.

---

# Ejecutar el backend 

Dentro de la carpeta backend ejecutar:

```bash
node server.js
```

Si todo sale bien aparecerá:

```bash
mysql conectado
Servidor corriendo en puerto 3000
```

---

# Abrir el frontend 🌐

Abrir el archivo:

```bash
index.html
```

o usar Live Server en Visual Studio Code.

---

# Credenciales de prueba 🔑

## Administrador

```txt
Correo:
admin@gmail.com

Contraseña:
123456
```

## Usuario

```txt
Correo:
usuario@gmail.com

Contraseña:
123456
```

---

# Características visuales 🎨

- Diseño moderno y responsive
- Cards dinámicas para tutores
- Modales emergentes
- Panel de administración
- Gestión de reservas
- Roles diferenciados

---

# Estado del proyecto ✅

Proyecto completamente funcional.

Incluye:
- Frontend
- Backend
- Base de datos
- Roles
- Reservas
- CRUD de tutores

---

# Repositorio GitHub 📌

Repositorio oficial:

https://github.com/Lmd-alejandro/Proyecto-Programacion-Web-Ing-Sis-VI-Semestre-AlejandroL-LuisS