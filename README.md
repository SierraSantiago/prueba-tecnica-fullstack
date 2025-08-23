# PrevalentWare - Gestión de Movimientos Financieros

## Descripción

Aplicación web para registrar, administrar y visualizar movimientos financieros de usuarios.  
Incluye funcionalidades de administración de usuarios, control de accesos y reportes financieros.
Inicio de sesión unicamente con Github.

**Tecnologías usadas:**

- Next.js (Pages Router) + TypeScript
- Tailwind CSS + Shadcn/UI
- Prisma con PostgreSQL (supabase)
- Recharts para gráficos
- Autenticación y autorización protegida
- Documentación de API con Swagger
- Tests unitarios con Jest + Supertest

---

## Requisitos

- Node.js
- npm
- PostgreSQL (local o remoto)
- Vercel account para despliegue

---

## Instalación local

1. **Clonar el repositorio**

```bash
git clone <URL_DEL_REPOSITORIO>
cd prueba-tecnica-fullstack-main
```

2. **Installar dependecnias**

```bash
npm install
```

3. **Configurar variables de entorno**
   Crear un archivo .env en la raíz del proyecto con el siguiente contenido:

```bash
#URL de la base de datos
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?pgbouncer=true&connection_limit=1&prepared_statements=false"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"  #Incluir esta si utilizas supabase

# Better Auth
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:PORT"
BETTER_AUTH_SECRET="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

#node env
NODE_ENV=development
```

4. **Migrar la base de datos con Prisma**

```bash
npx prisma migrate dev
```

5. **Ejecutar el proyecto en modo desarrollo**

```bash
npm run dev
```

El proyecto estará disponible en http://localhost:3000

6. **Ejecutar tests unitarios**
   Para ejecutar los Test

```bash
npx jest
```

## Documentación Swagger

La documentación de la API está disponible en:

```bash
/api/docs
```

Incluye todos los endpoints de usuarios y movimientos con sus parámetros, ejemplos y respuestas.

##Estructura

```bash
src/
 ├─ lib/
 |   ├─ prisma/         # Instancia de prisma
 |   ├─ auth/           # Github OAuth
 │   ├─ user/           # Controllers y servicios de usuarios
 │   ├─ utils/          # swaggerSchemas y config
 │   ├─ movements/      # Controllers y servicios de movimientos
 ├─ pages/
 │   ├─ api/            # Endpoints API
 │   ├─ movements/      # Pages de movimientos
 │   ├─ users/          # Pages de usuarios
 │   ├─ reports/        # Pages de reportes
 │   ├─ auth/           # Login
 ├─ components/         # UI y componentes reutilizables
 ├─ hooks/              # Hooks personalizados
 ├─ prisma/             # Modelo prisma
 ├─ public/             # elemntos estaticos
 ├─ __tests__/
 |   ├─ user.test/       # test users
 |   ├─ movements.test/  # test movements


```

## Despliegue en Vercel

1. **Conectar el repositorio**
- Ve a Vercel

- Importa tu repositorio de GitHub

2. **Configurar variables de entorno**
   Importante: Crear la variable NEXT_PUBLIC_BETTER_AUTH_URL, despues de desplegar cambiar el valor.

```bash
# Base de datos Supabase
DATABASE_URL="postgresql://postgres.USER:PASSWORD@aws-1-us-east-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&prepared_statements=false"
DIRECT_URL="postgresql://postgres.USER:PASSWORD@aws-1-us-east-2.pooler.supabase.com:5432/postgres"

# Better Auth
NEXT_PUBLIC_BETTER_AUTH_URL="https://TU_DOMINIO.vercel.app"             
BETTER_AUTH_SECRET="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# GitHub OAuth
GITHUB_CLIENT_ID="tu_client_id"
GITHUB_CLIENT_SECRET="tu_client_secret"

# Entorno
NODE_ENV="production"

```
4. **Deploy**
 
-Darle a deploy 

Cuando termine, la app estará disponible en tu dominio:
https://TU_DOMINIO.vercel.app

5. **Configurar OAuth en GitHub y variable de entorno**

Ahora 
- ya conoces tu url de dominio cambiar la variable del entorno en vercel por: https://TU_DOMINIO.vercel.app

- Ve a GitHub Developer Settings → OAuth Apps
En tu aplicación OAuth:

Homepage URL → https://TU_DOMINIO.vercel.app

Authorization callback URL → https://TU_DOMINIO.vercel.app/api/auth/callback/github

Por ultimo

- Copia el Client ID, Client Secret y cambia las variables de entorno en Vercel.

## Autor

Santiago Sierra Ramirez
