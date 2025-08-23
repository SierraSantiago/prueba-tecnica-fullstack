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
>>>>>>> b886f1a6ad27b5063e574c771d78ddd943a418ed

3. **Configurar variables de entorno**
Crear un archivo .env en la raíz del proyecto con el siguiente contenido:
```bash
#URL de la base de datos 
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"  #Incluir esta si utilizas supabase

# Better Auth 
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:PORT"

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
## Autor
Santiago Sierra Ramirez

