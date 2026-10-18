# Web de Crea Teamve: qué falta

Versión provisional. En la página, lo pendiente aparece con un recuadro rojo punteado y la etiqueta «Pendiente».
Cuando todo esté completo, quita la clase `modo-borrador` de `<body>` en `index.html` para ocultar las marcas y el aviso superior.

## Contacto (se edita en un solo lugar: `lib/manifest.js`)
- WhatsApp: número con código de país, solo dígitos. Activa el botón flotante y el formulario.
- Correo.
- Instagram: listo (`createamve`).
- Otras redes del pie de página: bloque `footer__social` en `index.html`.

## Portafolio
- 12 piezas reales en `assets/img/trabajos/`. Confirmar marca y tipo de trabajo de cada una.
- Para agregar una pieza: guarda la imagen en esa carpeta y copia un bloque `<article class="work">`.
- Reels: 6 videos en `assets/video/` (mp4 comprimido + portada .webp). Confirmar el nombre del cliente de cada uno.

## Dominio y SEO
- La web está en el dominio temporal `peru-swallow-795492.hostingersite.com` y Hostinger la actualiza sola con cada cambio en GitHub (`main`).
- Cuando haya dominio propio, reemplaza ese dominio temporal en `index.html` (canonical, og:url, og:image, twitter:image y JSON-LD), `robots.txt` y `sitemap.xml`.

## Testimonios
Sección comentada en `index.html`. Se activa solo con testimonios reales y con permiso.

## Publicar en Hostinger
Sube el contenido de esta carpeta (incluido `.htaccess`) a `public_html`. Al cambiar CSS o JS, cambia `?v=20261018f` en `index.html` por otro valor.
