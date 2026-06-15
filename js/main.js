const text = "Mobile App Developer • Kotlin • Flutter • RSS Feeds • REST APIs • Multi-Country News";
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
  const modal = document.getElementById("projectModal");
  const shouldLock = mobileDrawer.classList.contains("open") || (modal && modal.classList.contains("active"));
  document.body.classList.toggle("modal-open", shouldLock);
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
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const scrollPosition = window.scrollY + 120;
  let activeId = sections[0] ? sections[0].id : "";

  sections.forEach((section) => {
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

const projectData = {
  "news-app": {
    title: "Global News App",
    meta: "Kotlin • RSS Feeds • REST APIs • Room",
    status: "Currently Building",
    description: "A multi-country Android news application that combines RSS feed parsing and REST API integration to deliver localized headlines from different regions in one place.",
    role: "Building the data layer, country-based feed management, API and RSS integration, and a clean reading experience for browsing news by region and category.",
    features: [
      "Country-based news browsing across multiple regions",
      "RSS feed parsing and REST API integration",
      "Category filtering with dynamic content loading",
      "Offline-friendly caching with Room database",
      "Article detail view with source attribution",
      "Clean MVVM architecture for scalable feed sources"
    ],
    images: [
      "assets/projects/news-app/middle-east-home.png",
      "assets/projects/news-app/iran-home.png",
      "assets/projects/news-app/ukraine-home.png",
      "assets/projects/news-app/russia-home.png",
      "assets/projects/news-app/science-news-home.png",
      "assets/projects/news-app/north-news-home.png"
    ],
    code: "https://github.com/Aasim-Awan",
    demo: "#projects"
  },
  "cast-mirror": {
    title: "Cast & Mirror",
    meta: "Android • Screen Casting • Media Sharing",
    description: "A screen mirroring and media casting application for sharing phone content to TV, Chromecast, and smart display devices with a clean casting workflow.",
    role: "Built casting flows, device discovery UI, and media sharing screens for photos, videos, music, and web content.",
    features: [
      "Screen mirroring to TV and smart displays",
      "Cast photos, videos, music, and documents",
      "Available device discovery on same Wi-Fi",
      "Web video casting from popular platforms",
      "Simple and accessible casting interface"
    ],
    images: [
      "assets/projects/video-downloader/home.png",
      "assets/projects/video-downloader/cast-home.png",
      "assets/projects/video-downloader/screen-cast.png"
    ],
    code: "https://github.com/Aasim-Awan",
    demo: "#projects"
  },
  "carplay-app": {
    title: "CarPlay App",
    meta: "Android • Sensors • Emergency Features",
    description: "A safety-oriented mobile app built around crash detection, alert flows, and emergency support features.",
    role: "Developed safety workflows, alert logic, and core interaction screens for emergency use cases.",
    features: [
      "Crash detection concept integration",
      "Emergency alert workflow",
      "Location-aware safety support",
      "User-focused emergency response design"
    ],
    images: [
      "assets/projects/carplay-app/dashboard.png",
      "assets/projects/carplay-app/onboarding.png",
      "assets/projects/carplay-app/home.png"
    ],
    code: "https://github.com/Aasim-Awan",
    demo: "#projects"
  },
  "photo-editor": {
    title: "Photo Editor",
    meta: "Android • Image Processing",
    description: "A creative editing application featuring filters, enhancement tools, and background modification workflows.",
    role: "Built image editing screens, user-friendly controls, and polished the workflow for editing actions.",
    features: [
      "Filter application and enhancement tools",
      "Background removal workflow",
      "Simple editing controls",
      "Visual-first mobile experience"
    ],
    images: [
      "assets/projects/photo-editor/home.png"
    ],
    code: "https://github.com/Aasim-Awan",
    demo: "#projects"
  },
  "vpn-app": {
    title: "VPN App",
    meta: "Android • Networking • Security",
    description: "A connectivity-focused application designed for secure sessions, clean navigation, and reliable connection handling.",
    role: "Worked on the app structure, connection workflow design, and clean user experience for secure connectivity.",
    features: [
      "Secure connection workflow",
      "Auto reconnect support",
      "Simple and accessible interface",
      "Performance-focused interaction design"
    ],
    images: [
      "assets/projects/vpn-app/home.png"
    ],
    code: "https://github.com/Aasim-Awan",
    demo: "#projects"
  },
  "expense-tracker": {
    title: "Expense Tracker",
    meta: "Android • Budget • Local Storage",
    description: "A personal finance application for organizing daily expenses and improving visibility into spending habits.",
    role: "Built the expense tracking flow, structured local data handling, and designed a simple dashboard experience.",
    features: [
      "Daily expense recording",
      "Organized spending overview",
      "Locally managed data",
      "Clean Android-based interface"
    ],
    images: [
      "assets/projects/expense-tracker/dashboard.png",
      "assets/projects/expense-tracker/home.png",
      "assets/projects/expense-tracker/home-dashboard.png"
    ],
    code: "https://github.com/Aasim-Awan",
    demo: "#projects"
  }
};

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalStatus = document.getElementById("modalStatus");
const modalDescription = document.getElementById("modalDescription");
const modalRole = document.getElementById("modalRole");
const modalFeatures = document.getElementById("modalFeatures");
const modalImage = document.getElementById("modalImage");
const galleryStatus = document.getElementById("galleryStatus");
const modalCodeLink = document.getElementById("modalCodeLink");
const modalDemoLink = document.getElementById("modalDemoLink");
const closeModalBtn = document.getElementById("closeModal");
const prevImageBtn = document.getElementById("prevImage");
const nextImageBtn = document.getElementById("nextImage");
const projectCards = document.querySelectorAll(".project-card");

let currentProject = null;
let currentImageIndex = 0;

function renderModalImage() {
  if (!currentProject) return;
  const images = currentProject.images || [];
  modalImage.src = images[currentImageIndex];
  modalImage.alt = `${currentProject.title} screenshot ${currentImageIndex + 1}`;
  galleryStatus.textContent = `${currentImageIndex + 1} / ${images.length}`;
}

function openProjectModal(projectKey) {
  currentProject = projectData[projectKey];
  currentImageIndex = 0;
  if (!currentProject) return;

  modalTitle.textContent = currentProject.title;
  modalMeta.textContent = currentProject.meta;
  if (currentProject.status) {
    modalStatus.textContent = currentProject.status;
    modalStatus.hidden = false;
  } else {
    modalStatus.hidden = true;
  }
  modalDescription.textContent = currentProject.description;
  modalRole.textContent = currentProject.role;
  modalFeatures.innerHTML = currentProject.features.map(feature => `<li>${feature}</li>`).join("");
  modalCodeLink.href = currentProject.code;
  modalDemoLink.href = currentProject.demo;
  renderModalImage();

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  updateBodyScrollLock();
}

function closeProjectModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  updateBodyScrollLock();
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => openProjectModal(card.dataset.project));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectModal(card.dataset.project);
    }
  });
});

closeModalBtn.addEventListener("click", closeProjectModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeProjectModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProjectModal();
});

prevImageBtn.addEventListener("click", () => {
  if (!currentProject) return;
  const total = currentProject.images.length;
  currentImageIndex = (currentImageIndex - 1 + total) % total;
  renderModalImage();
});

nextImageBtn.addEventListener("click", () => {
  if (!currentProject) return;
  const total = currentProject.images.length;
  currentImageIndex = (currentImageIndex + 1) % total;
  renderModalImage();
});

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
