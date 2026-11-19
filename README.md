# SALINASVERSE

Enciclopedia monocromática del IES Pedro Salinas. «Todo lo que ocurre en el Pedro Salinas merece ser documentado».

## Publicación

El sitio se aloja en **GitHub Pages** y se publica automáticamente al hacer push a `main`. El flujo `.github/workflows/pages.yml` entrega la carpeta `site/` a Pages. No hay instalación de Node, paquetes ni base de datos para publicar.

Primera activación: en GitHub abre **Settings → Pages** y selecciona **GitHub Actions** como origen. El flujo publica en `https://davixini.github.io/Salinasverse/` después de ejecutarse.

## Editor y acceso

`/admin/` enlaza al editor Pages CMS. Para activarlo, inicia sesión en [Pages CMS](https://app.pagescms.org/) con GitHub e instala su GitHub App en la cuenta propietaria del repositorio. El editor escribe los cambios directamente al repositorio; el historial de Git conserva las versiones y cada push vuelve a desplegar la web. Limita los permisos de escritura del repositorio a la persona administradora para mantener un solo editor.

El editor **no utiliza usuario y contraseña propios**. GitHub verifica la identidad y los permisos. No configures `mipapa` / `queso` en el sitio: cualquier contraseña comprobada por JavaScript público se puede leer o eludir. GitHub Pages no ejecuta autenticación de servidor.

## Contenido

- `site/data/articles.json`: artículos, personajes, lugares y entradas culturales.
- `site/data/events.json`: acontecimientos independientes de las entradas.
- `site/media/`: imágenes persistentes versionadas en el repositorio.
- `.pages.yml`: formularios de Pages CMS para editar artículos, fechas, referencias, etiquetas y medios.

El buscador instantáneo, índices por categoría, fichas, enlaces internos `[[Título exacto]]`, cronología, entradas destacadas, aleatorias, normas, preguntas frecuentes y 404 funcionan en el navegador sin backend. Las listas están vacías al inicio; no se inventaron historias sobre personas.

## Límites de GitHub Pages

Pages sirve archivos estáticos y no proporciona PostgreSQL, API privada, sesiones de aplicación, contador de visitas del servidor ni almacenamiento de objetos separado. Los artículos y las imágenes sí persisten como archivos en GitHub, con historial de cambios. Las visitas no se cuentan automáticamente. Para una base de datos SQL, autenticación de aplicación con claves propias o analítica persistente hace falta un backend y un servicio externo; eso no se puede ejecutar dentro de Pages.

La identidad única se basa en los permisos del repositorio y GitHub App. No existe login `/admin` con contraseña `queso`, deliberadamente: no sería privado en un hosting estático.

## Privacidad editorial

No publiques direcciones, teléfonos, horarios personales ni información sensible. No publiques rumores como hechos, contenido de acoso o fotografías de personas sin autorización. Atiende las solicitudes de corrección o retirada de información sobre personas.

## Desarrollo local

Abre `site/index.html` con un servidor estático local; por ejemplo, desde la raíz del repositorio:

```powershell
python -m http.server 8000 --directory site
```

Luego abre `http://localhost:8000`. El buscador y las rutas internas se ejecutan en el cliente. Una vez instalado Pages CMS, editar y guardar contenido crea cambios en GitHub, y Actions publica los cambios.
