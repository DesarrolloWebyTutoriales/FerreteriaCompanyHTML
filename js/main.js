// Menú móvil
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// Formulario: prepara el mensaje para WhatsApp.
// IMPORTANTE: reemplaza 519XXXXXXXX por el número real, con código de país y sin + ni espacios.
const whatsappNumber = "519XXXXXXXX";
document.querySelector("#quote-form").addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const name = formData.get("name").trim();
  const phone = formData.get("phone").trim();
  const interest = formData.get("interest");
  const message = formData.get("message").trim();

  const text = [
    "Hola, Ferretería Uzías. Deseo solicitar una cotización.",
    `Nombre: ${name}`,
    phone ? `Teléfono: ${phone}` : "",
    `Producto de interés: ${interest}`,
    message ? `Detalle: ${message}` : ""
  ].filter(Boolean).join("\n");

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});

// Año automático
document.querySelector("#year").textContent = new Date().getFullYear();

// Animaciones al entrar en pantalla
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}