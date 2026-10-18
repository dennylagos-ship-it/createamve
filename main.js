/* Crea Teamve — interacciones. Sin módulos ni dependencias. */
(function () {
  "use strict";
  var B = window.__BRAND__ || {};

  function safe(fn, name) {
    try { fn(); } catch (e) { if (window.console) console.warn("[" + name + "]", e); }
  }

  // Rellena los enlaces de contacto con los datos de lib/manifest.js
  function initCanales() {
    var urls = {
      whatsapp: B.whatsapp ? "https://wa.me/" + String(B.whatsapp).replace(/\D/g, "") : "",
      correo: B.correo ? "mailto:" + B.correo : "",
      instagram: B.instagram ? "https://www.instagram.com/" + String(B.instagram).replace(/^@/, "") : ""
    };
    var textos = { whatsapp: B.whatsapp ? "+" + String(B.whatsapp).replace(/\D/g, "") : "", correo: B.correo || "", instagram: B.instagram ? "@" + String(B.instagram).replace(/^@/, "") : "" };
    document.querySelectorAll("[data-canal]").forEach(function (a) {
      var c = a.getAttribute("data-canal");
      if (urls[c]) {
        a.href = urls[c];
        a.removeAttribute("data-pendiente");
        var v = a.querySelector(".channel__v");
        if (v) v.textContent = textos[c];
      } else if (a.classList.contains("fab")) {
        a.classList.add("is-hidden");
      } else {
        a.addEventListener("click", function (e) { e.preventDefault(); });
      }
    });
    var redes = document.querySelector(".footer__social");
    if (redes && B.instagram) redes.removeAttribute("data-pendiente");
  }

  function initNav() {
    var nav = document.getElementById("nav");
    var toggle = document.getElementById("menuToggle");
    var menu = document.getElementById("menu");
    var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    function cerrar() { menu.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }
    toggle.addEventListener("click", function () {
      var abierto = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", abierto ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", cerrar); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrar(); });
  }

  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 80 + "ms";
      io.observe(el);
    });
    // Red de seguridad: nada queda oculto pasado un tiempo
    setTimeout(function () { items.forEach(function (el) { el.classList.add("is-in"); }); }, 6000);
  }

  // Brillo que sigue al cursor en las tarjetas de servicios
  function initBrillo() {
    document.querySelectorAll(".tile").forEach(function (t) {
      t.addEventListener("pointermove", function (e) {
        var r = t.getBoundingClientRect();
        t.style.setProperty("--mx", (e.clientX - r.left) + "px");
        t.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  // La frase de "Nosotros" se ilumina palabra por palabra al hacer scroll
  function initFrase() {
    var el = document.querySelector("[data-words]");
    if (!el) return;
    var palabras = el.textContent.trim().split(/\s+/);
    el.innerHTML = palabras.map(function (w) { return '<span class="w">' + w + "</span>"; }).join(" ");
    var spans = el.querySelectorAll(".w");
    function pinta() {
      var r = el.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      var n = Math.round(p * spans.length);
      spans.forEach(function (s, i) { s.classList.toggle("on", i < n); });
    }
    window.addEventListener("scroll", pinta, { passive: true });
    window.addEventListener("resize", pinta);
    pinta();
  }

  // El formulario arma el mensaje y lo abre en WhatsApp (o en el correo si no hay WhatsApp)
  function initForm() {
    var form = document.getElementById("contactForm");
    var nota = document.getElementById("formNote");
    if (!form) return;
    var boton = form.querySelector("button[type=submit]");
    if (!B.whatsapp && B.correo) boton.textContent = "Enviar por correo";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      nota.className = "form__note";
      var d = new FormData(form);
      var nombre = (d.get("nombre") || "").trim();
      var mensaje = (d.get("mensaje") || "").trim();
      if (!nombre || !mensaje) {
        nota.textContent = "Escribe tu nombre y cuéntanos qué necesitas.";
        nota.classList.add("is-error");
        return;
      }
      var marca = (d.get("marca") || "").trim();
      var texto = "Hola Crea Teamve, soy " + nombre + (marca ? " de " + marca : "") + ".\n" +
        "Me interesa: " + d.get("servicio") + ".\n\n" + mensaje;
      if (B.whatsapp) {
        window.open("https://wa.me/" + String(B.whatsapp).replace(/\D/g, "") + "?text=" + encodeURIComponent(texto), "_blank", "noopener");
        nota.textContent = "Se abrió WhatsApp con tu mensaje. Solo falta enviarlo.";
      } else if (B.correo) {
        window.location.href = "mailto:" + B.correo + "?subject=" + encodeURIComponent("Proyecto con Crea Teamve") + "&body=" + encodeURIComponent(texto);
        nota.textContent = "Se abrió tu correo con el mensaje listo.";
      } else {
        nota.textContent = "El contacto aún no está configurado en esta versión provisional.";
        nota.classList.add("is-error");
      }
    });
  }

  function initPortafolio() {
    var chips = document.querySelectorAll(".chip[data-filtro]");
    var items = document.querySelectorAll(".work[data-grupo]");
    chips.forEach(function (c) {
      c.addEventListener("click", function () {
        var f = c.getAttribute("data-filtro");
        chips.forEach(function (o) { o.classList.toggle("is-active", o === c); o.setAttribute("aria-pressed", o === c ? "true" : "false"); });
        items.forEach(function (it) {
          var ver = f === "todos" || it.getAttribute("data-grupo") === f;
          it.classList.toggle("is-oculto", !ver);
          if (ver) it.classList.add("is-in");
        });
      });
    });
    var box = document.getElementById("lightbox");
    var img = document.getElementById("lightboxImg");
    if (!box || typeof box.showModal !== "function") return;
    document.querySelectorAll(".work__btn[data-full]").forEach(function (b) {
      b.addEventListener("click", function () {
        var thumb = b.querySelector("img");
        img.src = b.getAttribute("data-full");
        img.alt = thumb ? thumb.alt : "";
        box.showModal();
      });
    });
    document.getElementById("lightboxClose").addEventListener("click", function () { box.close(); });
    box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
  }

  // Reels: vista previa sin sonido al pasar el cursor y reproductor con sonido al tocar
  function initReels() {
    var puedeHover = window.matchMedia("(hover: hover)").matches;
    var box = document.getElementById("videobox");
    var player = document.getElementById("videoboxPlayer");
    document.querySelectorAll(".clip__btn").forEach(function (b) {
      var v = b.querySelector("video");
      if (puedeHover && v) {
        b.addEventListener("mouseenter", function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); });
        b.addEventListener("mouseleave", function () { v.pause(); });
      }
      b.addEventListener("click", function () {
        if (v) v.pause();
        if (!box || typeof box.showModal !== "function") { window.open(b.getAttribute("data-video"), "_blank"); return; }
        player.src = b.getAttribute("data-video");
        box.showModal();
        var p = player.play(); if (p && p.catch) p.catch(function () {});
      });
    });
    if (!box) return;
    function cerrar() { player.pause(); player.removeAttribute("src"); player.load(); box.close(); }
    document.getElementById("videoboxClose").addEventListener("click", cerrar);
    box.addEventListener("click", function (e) { if (e.target === box) cerrar(); });
    box.addEventListener("cancel", function () { player.pause(); });
  }

  function init() {
    document.documentElement.classList.remove("no-js");
    safe(initCanales, "canales");
    safe(initNav, "nav");
    safe(initReveal, "reveal");
    safe(initBrillo, "brillo");
    safe(initFrase, "frase");
    safe(initForm, "form");
    safe(initPortafolio, "portafolio");
    safe(initReels, "reels");
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
