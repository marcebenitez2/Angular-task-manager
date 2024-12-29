# PruebaAngular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


```
prueba-angular
├─ .angular
├─ .editorconfig
├─ angular.json
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
│  │  │  │  └─ auth.interceptor.ts
│  │  │  ├─ models
│  │  │  │  ├─ auth.model.ts
│  │  │  │  └─ project.model.ts
│  │  │  └─ services
│  │  │     ├─ auth.service.spec.ts
│  │  │     ├─ auth.service.ts
│  │  │     └─ project.service.ts
│  │  ├─ features
│  │  │  ├─ auth
│  │  │  │  ├─ auth.routes.ts
│  │  │  │  ├─ login
│  │  │  │  │  ├─ login.component.css
│  │  │  │  │  ├─ login.component.spec.ts
│  │  │  │  │  └─ login.component.ts
│  │  │  │  └─ register
│  │  │  │     └─ register.component.ts
│  │  │  └─ projects
│  │  │     ├─ project-form
│  │  │     │  └─ project-form.component.ts
│  │  │     ├─ project-list
│  │  │     │  ├─ project-list.component.css
│  │  │     │  ├─ project-list.component.spec.ts
│  │  │     │  └─ project-list.component.ts
│  │  │     └─ projects.routes.ts
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
│  └─ styles.css
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json

```