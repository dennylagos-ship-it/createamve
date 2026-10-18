# Crea Teamve · Sitio web

Sitio estático (HTML, CSS y JavaScript, sin dependencias ni compilación) de Crea Teamve, agencia de contenido y social media en San Cristóbal, Táchira, Venezuela.

## Ver en local
Abre `index.html` en el navegador, o sirve la carpeta con `python3 -m http.server 8765`.

## Estructura
- `index.html`: contenido de todas las secciones.
- `styles.css`: diseño. Los colores y fuentes están en las variables de `:root`.
- `main.js`: menú, animaciones, filtros del portafolio y formulario (abre WhatsApp con el mensaje).
- `lib/manifest.js`: datos de contacto (WhatsApp, correo e Instagram).
- `assets/img/`: logo, foto y trabajos del portafolio.
- `.htaccess`: caché y tipos de archivo para Hostinger.

## Pendientes
Ver `PENDIENTES.md`. Mientras `<body>` tenga la clase `modo-borrador`, la web marca en rojo lo que falta confirmar.

## Publicar
Sube el contenido del repositorio a `public_html` en Hostinger, o activa GitHub Pages en la rama `main`.
