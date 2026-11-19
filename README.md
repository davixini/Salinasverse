# SALINASVERSE

Enciclopedia documental del IES Pedro Salinas. «Todo lo que ocurre en el Pedro Salinas merece ser documentado».

Consulta pública, escritura reservada a una única cuenta administradora. El proyecto no incluye contenido ficticio ni datos de demostración sobre personas. Las categorías iniciales son taxonomía vacía y no representan hechos.

## Stack

- Next.js 15, React 19 y TypeScript.
- PostgreSQL con Prisma ORM y migraciones versionadas.
- Autenticación de propietario único mediante hash bcrypt y cookie firmada HMAC, httpOnly, secure en producción y sameSite strict.
- Almacenamiento de imágenes S3 compatible (por ejemplo, Cloudflare R2, AWS S3 o MinIO con bucket persistente).
- Validación de entradas con Zod y saneamiento HTML en servidor.

## Requisitos

Node.js 20.11 o posterior, npm, PostgreSQL 14 o posterior, y credenciales de un almacenamiento S3 compatible para publicar imágenes. El servidor debe mantener las variables de entorno y usar PostgreSQL/S3 externos persistentes. No se guarda contenido en el navegador ni en el disco efímero del servidor.

## Instalación local

1. Copia `.env.example` a `.env` y configura `DATABASE_URL`, `SESSION_SECRET` (mínimo 32 caracteres) y `ADMIN_USERNAME`.
2. Ejecuta `npm install`.
3. Aplica el esquema: `npm run db:migrate`.
4. Crea las categorías vacías: `npm run db:seed`.
5. Crea la cuenta única de propietario con una contraseña temporal segura:

   PowerShell: `$env:ADMIN_USERNAME='propietario'; $env:ADMIN_PASSWORD='una-frase-segura-de-16-caracteres-o-mas'; npm run admin:create; Remove-Item Env:ADMIN_PASSWORD`

   Bash: `ADMIN_USERNAME=propietario ADMIN_PASSWORD='una-frase-segura-de-16-caracteres-o-mas' npm run admin:create`

   El registro admin usa un identificador fijo y la base acepta una sola fila. El usuario debe ser igual a `ADMIN_USERNAME` configurado para el despliegue.
6. Arranca con `npm run dev` y visita `http://localhost:3000`.

No uses la contraseña temporal como variable persistente de producción. La aplicación no registra usuarios públicos.

## Variables

| Variable | Uso |
| --- | --- |
| `DATABASE_URL` | Conexión PostgreSQL persistente |
| `SESSION_SECRET` | Secreto HMAC de sesiones, mínimo 32 caracteres aleatorios |
| `ADMIN_USERNAME` | Nombre de la cuenta única; coincide con la fila `Admin` |
| `SITE_URL` | URL base de despliegue |
| `S3_ENDPOINT` | Endpoint compatible (vacío para AWS S3) |
| `S3_REGION` | Región del bucket (R2 suele usar `auto`) |
| `S3_BUCKET` | Bucket privado/público según tu CDN |
| `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | Credenciales limitadas al bucket de medios |
| `S3_PUBLIC_URL` | Base pública/CDN donde se sirven las imágenes |

## Despliegue

Despliega como servicio Node.js con almacenamiento persistente externo. Configura PostgreSQL administrado, variables del panel del proveedor y bucket S3/CDN; luego ejecuta `npm run db:migrate`, `npm run db:seed` una sola vez y `npm run build`. Inicia con `npm start`. No uses SQLite, discos efímeros para uploads ni una base enlazada solo al contenedor. Configura HTTPS para que el navegador envíe la cookie segura.

## Copias de seguridad

- PostgreSQL: programa `pg_dump --format=custom --no-owner "$DATABASE_URL" > salinasverse-$(date +%F).dump` con retención cifrada fuera del servidor. Restauración: `pg_restore --clean --if-exists --no-owner --dbname "$DATABASE_URL" copia.dump`.
- Imágenes: habilita versionado del bucket o sincronización periódica cifrada a otra ubicación. Prueba restauraciones periódicamente.
- Restringe acceso a las copias, secretos y credenciales; nunca las añadas al repositorio.

## Funcionalidad

Portada editorial monocromática, índices temáticos, páginas de artículo, búsqueda de texto parcial en PostgreSQL, cronología ascendente/descendente, artículo aleatorio, contador de visitas, revisiones al crear/editar, referencias, ficha informativa, artículos relacionados, borradores, publicación, carga de imágenes, panel `/admin`, normas de privacidad, información, FAQ y 404. El endpoint de escritura comprueba la sesión en servidor; ocultar la interfaz no es el mecanismo de autorización.

El editor acepta HTML saneado (párrafos, títulos, listas, enlaces y tablas). Los cambios guardan una revisión previa. La corrección/retirada de información sobre personas se gestiona desde la cuenta propietaria; no existe buzón de solicitudes externo configurado.

## Privacidad y seguridad

No hay contenido precargado sobre personas. No publiques datos sensibles, rumores, material de acoso ni fotografías sin autorización. La cookie expira en 12 horas, es httpOnly y SameSite Strict. El inicio de sesión limita intentos por IP durante el proceso del servidor; para réplicas múltiples, añade limitación compartida (Redis/WAF). Usa un `SESSION_SECRET` propio por entorno y protege las credenciales de PostgreSQL y del bucket.

## Estructura

```text
src/app/          páginas públicas, API y administración
src/lib/          base de datos, autenticación y utilidades
prisma/           esquema, migraciones y categorías iniciales
scripts/          configuración de la cuenta propietaria
```

## Comprobaciones

`npm run build` compila Prisma y Next.js; `npm run db:migrate` aplica migraciones. Este entorno de trabajo debe tener npm, Node, PostgreSQL y servicios externos disponibles para verificar el despliegue integral.
