// cursor spotlight
window.addEventListener('mousemove', (e) => {
  document.body.style.setProperty('--x', e.clientX + 'px');
  document.body.style.setProperty('--y', e.clientY + 'px');
});

// nav and scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => navObserver.observe(section));

// fade in on scroll
const fadeEls = document.querySelectorAll(
  '.project-card, .service-card, .about-content, .skills-list'
);

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});


// ===== PACKAGE SWITCHER =====
function setPackage(pkg) {

  // update active button
  document.querySelectorAll('.switcher-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById('btn-' + pkg).classList.add('active');

  // remove all package classes from body
  document.body.classList.remove('pkg-basic', 'pkg-standard', 'pkg-premium');

  // add selected package class
  document.body.classList.add('pkg-' + pkg);

  // show banner
  showPackageBanner(pkg);
}

function showPackageBanner(pkg) {
  const messages = {
    basic: '⚡ Basic | Single page, mobile friendly, contact button',
    standard: '🚀 Standard  | 3-5 pages, gallery, contact form, WhatsApp',
    premium: '💎 Premium  | Full custom site, animations, advanced features'
  };

  // remove existing banner
  const existing = document.getElementById('pkg-banner');
  if (existing) existing.remove();

  // create banner
  const banner = document.createElement('div');
  banner.id = 'pkg-banner';
  banner.textContent = messages[pkg];
  document.body.appendChild(banner);

  // auto hide after 3 seconds
  setTimeout(() => {
    banner.style.opacity = '0';
    setTimeout(() => banner.remove(), 400);
  }, 3000);
}

// set standard as default on load
window.addEventListener('load', () => {
  setPackage('standard');
});