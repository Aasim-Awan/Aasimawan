const text = "Android Developer • Kotlin • Java • VPN • Photo Editor • RSS News • MVVM";
let i = 0;
function type() {
  const el = document.getElementById("typing");
  if (i < text.length) {
    el.textContent += text.charAt(i);
    i++;
    setTimeout(type, 45);
  }
}
type();

const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.12 });
sections.forEach((section) => observer.observe(section));

const toggleBtn = document.getElementById("themeToggle");
const drawerThemeToggle = document.getElementById("drawerThemeToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileDrawer = document.getElementById("mobileDrawer");
const closeDrawerBtn = document.getElementById("closeDrawer");
const drawerBackdrop = document.getElementById("drawerBackdrop");
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"], .drawer-links a[href^="#"]');

let previouslyFocusedElement = null;

function updateBodyScrollLock() {
  const shouldLock = mobileDrawer.classList.contains("open");
  document.body.classList.toggle("drawer-open", shouldLock);
}

function syncThemeButtons() {
  const isLight = document.body.classList.contains("light");
  const label = isLight ? "Dark Mode" : "Light Mode";
  toggleBtn.textContent = label;
  drawerThemeToggle.textContent = label;
}

function toggleTheme() {
  document.body.classList.toggle("light");
  syncThemeButtons();
}

function openDrawer() {
  previouslyFocusedElement = document.activeElement;
  mobileDrawer.classList.add("open");
  drawerBackdrop.hidden = false;
  drawerBackdrop.classList.add("open");
  mobileDrawer.setAttribute("aria-hidden", "false");
  menuToggle.setAttribute("aria-expanded", "true");
  const firstFocusable = mobileDrawer.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
  if (firstFocusable) firstFocusable.focus();
  updateBodyScrollLock();
}

function closeDrawer() {
  mobileDrawer.classList.remove("open");
  drawerBackdrop.classList.remove("open");
  mobileDrawer.setAttribute("aria-hidden", "true");
  menuToggle.setAttribute("aria-expanded", "false");
  if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === "function") {
    previouslyFocusedElement.focus();
  }
  updateBodyScrollLock();
  window.setTimeout(() => {
    if (!mobileDrawer.classList.contains("open")) {
      drawerBackdrop.hidden = true;
    }
  }, 280);
}

function trapDrawerFocus(event) {
  if (!mobileDrawer.classList.contains("open") || event.key !== "Tab") return;
  const focusables = mobileDrawer.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function updateActiveNavLink() {
  const pageSections = Array.from(document.querySelectorAll("section[id]"));
  const scrollPosition = window.scrollY + 120;
  let activeId = pageSections[0] ? pageSections[0].id : "";

  pageSections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      activeId = section.id;
    }
  });

  navAnchors.forEach((anchor) => {
    const matches = anchor.getAttribute("href") === `#${activeId}`;
    anchor.classList.toggle("active", matches);
    if (matches) {
      anchor.setAttribute("aria-current", "page");
    } else {
      anchor.removeAttribute("aria-current");
    }
  });
}

syncThemeButtons();
toggleBtn.addEventListener("click", toggleTheme);
drawerThemeToggle.addEventListener("click", toggleTheme);
menuToggle.addEventListener("click", openDrawer);
closeDrawerBtn.addEventListener("click", closeDrawer);
drawerBackdrop.addEventListener("click", closeDrawer);
document.querySelectorAll(".drawer-links a").forEach((link) => {
  link.addEventListener("click", closeDrawer);
});
document.addEventListener("keydown", trapDrawerFocus);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDrawer();
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 820) closeDrawer();
});
window.addEventListener("scroll", updateActiveNavLink, { passive: true });
updateActiveNavLink();

tsParticles.load("particles", {
  background: { color: { value: "transparent" } },
  particles: {
    number: { value: 45, density: { enable: true, area: 900 } },
    color: { value: "#38bdf8" },
    links: {
      enable: true,
      color: "#38bdf8",
      opacity: 0.18,
      distance: 130
    },
    move: {
      enable: true,
      speed: 1,
      outModes: { default: "bounce" }
    },
    size: { value: { min: 1, max: 3 } },
    opacity: { value: 0.5 }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      resize: true
    },
    modes: {
      grab: { distance: 140, links: { opacity: 0.3 } }
    }
  }
});
