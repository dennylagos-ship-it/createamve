# Web de Crea Teamve: qué falta

Versión provisional. En la página, lo pendiente aparece con un recuadro rojo punteado y la etiqueta «Pendiente».
Cuando todo esté completo, quita la clase `modo-borrador` de `<body>` en `index.html` para ocultar las marcas y el aviso superior.

## Contacto (se edita en un solo lugar: `lib/manifest.js`)
- WhatsApp: número con código de país, solo dígitos. Activa el botón flotante y el formulario.
- Correo.
- Instagram: listo (`createamve`).
- Otras redes del pie de página: bloque `footer__social` en `index.html`.

## Textos (`index.html`)
- Inicio: la frase de presentación.
- Cinta de marcas: confirmar Bahía Bar, Super Pepsi, Cueros Jasimay y Y13 Pro, y el permiso para nombrarlas.
- Servicios: dejar solo los confirmados (y sus opciones en el formulario).
- Nosotros: historia del equipo, cargo de Freddy y años de experiencia.
- Proceso: los 5 pasos son una propuesta.

## Portafolio
- 12 piezas reales en `assets/img/trabajos/`. Confirmar marca y tipo de trabajo de cada una.
- Para agregar una pieza: guarda la imagen en esa carpeta y copia un bloque `<article class="work">`.
- Videos o reels: pendiente elegir cuáles.

## Testimonios
Sección comentada en `index.html`. Se activa solo con testimonios reales y con permiso.

## Publicar en Hostinger
Sube el contenido de esta carpeta (incluido `.htaccess`) a `public_html`. Al cambiar CSS o JS, cambia `?v=20261018c` en `index.html` por otro valor.
