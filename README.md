# Gestión de Proyectos y Tareas - Angular

## 📋 Descripción
Aplicación web desarrollada en Angular que permite la gestión de proyectos y tareas, con sistema de autenticación de usuarios, drag and drop para tareas, y múltiples funcionalidades para la administración de proyectos.

## ✨ Características Principales
- Sistema de autenticación completo (registro, login, logout)
- Gestión de proyectos (CRUD)
- Sistema de tareas con drag and drop
- Filtros y búsqueda en tiempo real
- Interfaz responsiva con Angular Material
- Protección de rutas
- Manejo de estado con RxJS
- Conexión a API REST en producción

## 🛠️ Tecnologías
- Angular (última versión)
- Angular Material
- RxJS
- TailwindCSS
- TypeScript
- Angular CDK (Drag and Drop)

## 📦 Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/marcebenitez2/Angular-task-manager.git
```

2. Instalar dependencias
```bash
npm install
```

3. Iniciar servidor de desarrollo
```bash
ng serve
```

4. Navegar a `http://localhost:4200/`

## 🌐 Configuración de API

### Desarrollo
Por defecto, la aplicación se conectará al servidor local de desarrollo.

### Producción
La aplicación está configurada para conectarse a la API de producción:
```
https://api-rest-task-manager.netlify.app
```

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run start

# Construcción
npm run build

# Testing
npm run test
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/               # Servicios, guardias e interceptores
│   ├── features/          # Módulos principales
│   │   ├── auth/         # Autenticación
│   │   ├── projects/     # Gestión de proyectos
│   │   └── tasks/        # Gestión de tareas
│   └── shared/           # Componentes compartidos
├── environments/          # Configuración de entornos
└── assets/               # Recursos estáticos
```

## 🔒 Funcionalidades de Autenticación

- Registro de usuarios
- Login con JWT
- Guard para rutas protegidas
- Interceptor para tokens
- Manejo de sesión

## 📊 Gestión de Proyectos

- Listado de proyectos
- Creación y edición
- Detalles del proyecto
- Asignación de usuarios
- Filtros y búsqueda

## ✅ Gestión de Tareas

- Tablero con columnas de estado
- Drag and drop para cambiar estado
- Filtros por múltiples criterios
- Edición rápida mediante diálogo
- Asignación de usuarios

## 🔍 Testing

- Pruebas unitarias con Jasmine
- Testing de componentes con TestBed

## 📱 Optimización

- Lazy loading de módulos
- Estrategia OnPush
- Interceptores para manejo de errores
- Manejo eficiente de estado

## 🚀 Despliegue

El proyecto fue desplegado en:
- Netlify

## 👤 Autor

Marcelo Benitez
- GitHub: marcebenitez2
- LinkedIn: [marcebenitez2](https://www.linkedin.com/in/benitez-marcelo/)

```
prueba-angular
├─ .angular
├─ .editorconfig
├─ angular.json
├─ cypress
│  ├─ downloads
│  ├─ e2e
│  │  ├─ 1-getting-started
│  │  └─ 2-advanced-examples
│  ├─ fixtures
│  └─ support
├─ package-lock.json
├─ package.json
├─ public
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app.component.css
│  │  ├─ app.component.html
│  │  ├─ app.component.spec.ts
│  │  ├─ app.component.ts
│  │  ├─ app.config.ts
│  │  ├─ app.routes.ts
│  │  ├─ core
│  │  │  ├─ guards
│  │  │  │  └─ auth.guard.ts
│  │  │  ├─ interceptors
│  │  │  │  ├─ auth.interceptor.ts
│  │  │  │  └─ error.interceptor.ts
│  │  │  ├─ models
│  │  │  │  ├─ auth.model.ts
│  │  │  │  ├─ project.model.ts
│  │  │  │  ├─ task.model.ts
│  │  │  │  └─ user.model.ts
│  │  │  └─ services
│  │  │     ├─ auth.service.spec.ts
│  │  │     ├─ auth.service.ts
│  │  │     ├─ project.service.ts
│  │  │     ├─ task.service.ts
│  │  │     └─ users.service.ts
│  │  ├─ features
│  │  │  ├─ auth
│  │  │  │  ├─ auth.routes.ts
│  │  │  │  ├─ login
│  │  │  │  │  ├─ login.component.css
│  │  │  │  │  ├─ login.component.spec.ts
│  │  │  │  │  └─ login.component.ts
│  │  │  │  └─ register
│  │  │  │     ├─ register.component.css
│  │  │  │     ├─ register.component.spect.ts
│  │  │  │     └─ register.component.ts
│  │  │  ├─ projects
│  │  │  │  ├─ project-detail
│  │  │  │  │  └─ project-detail.component.ts
│  │  │  │  ├─ project-edit
│  │  │  │  │  ├─ project-edit.component.css
│  │  │  │  │  └─ project-edit.component.ts
│  │  │  │  ├─ project-form
│  │  │  │  │  ├─ project-form.component.css
│  │  │  │  │  └─ project-form.component.ts
│  │  │  │  ├─ project-header
│  │  │  │  ├─ project-list
│  │  │  │  │  ├─ project-list.component.css
│  │  │  │  │  ├─ project-list.component.spec.ts
│  │  │  │  │  └─ project-list.component.ts
│  │  │  │  ├─ projects.routes.ts
│  │  │  │  └─ resolvers
│  │  │  │     └─ project-list.resolver.ts
│  │  │  └─ tasks
│  │  │     ├─ task-card
│  │  │     ├─ task-column
│  │  │     ├─ task-edit-dialog
│  │  │     │  └─ task-edit-dialog.component.ts
│  │  │     ├─ task-filter
│  │  │     └─ task-form
│  │  └─ shared
│  │     └─ not-found
│  │        ├─ not-found.component.css
│  │        ├─ not-found.component.html
│  │        ├─ not-found.component.spec.ts
│  │        └─ not-found.component.ts
│  ├─ environments
│  │  └─ environment.ts
│  ├─ index.html
│  ├─ main.ts
│  ├─ styles.css
│  └─ _redirects
├─ tailwind.config.js
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json
```