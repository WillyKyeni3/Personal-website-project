document.addEventListener('DOMContentLoaded', () => {
  // Render Lucide SVG icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Dynamic copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile navigation toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Category filter tabs
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filterValue = button.getAttribute('data-filter');

      filterButtons.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });

      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        const shouldShow = filterValue === 'all' || category === filterValue;
        card.classList.toggle('hidden', !shouldShow);
      });
    });
  });

  // Graceful fallback if Formspree ID is still placeholder
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      const action = contactForm.getAttribute('action') || '';
      if (action.includes('YOUR_FORMSPREE_ID')) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const type = document.getElementById('inquiryType').value;
        const message = document.getElementById('message').value.trim();
        const subject = encodeURIComponent(`[Portfolio Inquiry] ${type} — ${name}`);
        const body = encodeURIComponent(`From: ${name} (${email})\nFocus: ${type}\n\n${message}`);
        formFeedback.textContent = 'Opening your default email client to send your inquiry...';
        window.location.href = `mailto:willy.kyeni@gmail.com?subject=${subject}&body=${body}`;
      }
    });
  }
});