/* ═══════════════════════════════════════════════
   ALEX RIVERA PORTFOLIO — script.js
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────
     1. CUSTOM CURSOR
  ────────────────────────────── */
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor follow
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    cursor.style.left = cursorX - 5 + 'px';
    cursor.style.top  = cursorY - 5 + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Grow on hoverable elements
  const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-group, .social-link, input, textarea');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
  });


  /* ──────────────────────────────
     2. NAVBAR — scroll + active
  ────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Scrolled class
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link highlight
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });


  /* ──────────────────────────────
     3. HAMBURGER MENU
  ────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });


  /* ──────────────────────────────
     4. SCROLL REVEAL
  ────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Staggered delay for siblings
        const siblings = Array.from(entry.target.parentElement.children)
          .filter(el => el.classList.contains('reveal'));
        const idx = siblings.indexOf(entry.target);
        const delay = idx * 80;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  // Also reveal hero elements on load
  document.querySelectorAll('.hero-badge, .hero-title, .hero-role, .hero-desc, .hero-cta').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.7s ease ${i * 100}ms, transform 0.7s ease ${i * 100}ms`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + i * 100);
  });

  // Avatar ring pop-in
  const avatarRing = document.querySelector('.avatar-ring');
  if (avatarRing) {
    avatarRing.style.opacity = '0';
    avatarRing.style.transform = 'scale(0.85)';
    avatarRing.style.transition = 'opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s';
    setTimeout(() => {
      avatarRing.style.opacity = '1';
      avatarRing.style.transform = 'scale(1)';
    }, 100);
  }


  /* ──────────────────────────────
     5. GLASS CARD TILT (3D)
  ────────────────────────────── */
  const tiltCards = document.querySelectorAll('.glass-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const tiltX = dy * -5;
      const tiltY = dx *  5;
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });


  /* ──────────────────────────────
     6. SKILL BARS — number counter
  ────────────────────────────── */
  const statNums = document.querySelectorAll('.stat-num');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.textContent);
        const suffix = el.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const step = Math.ceil(target / 40);

        const counter = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current >= target) clearInterval(counter);
        }, 30);

        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => countObserver.observe(el));


  /* ──────────────────────────────
     7. CONTACT FORM
  ────────────────────────────── */
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const name  = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const msg   = form.querySelector('#message').value.trim();

      if (!name || !email || !msg) {
        shakeForm(form);
        return;
      }

      // Simulate send
     btn.textContent = 'Sending…';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      fetch('https://formspree.io/f/mqeydnqd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message: msg })
      })
      .then(res => {
        if (res.ok) {
          btn.textContent = '✓ Message Sent!';
          btn.style.background = 'rgba(0,255,136,0.15)';
          btn.style.color = 'var(--green)';
          btn.style.border = '1px solid rgba(0,255,136,0.3)';
          btn.style.opacity = '1';

          form.querySelectorAll('input, textarea').forEach(input => {
            input.value = '';
          });

          setTimeout(() => {
            btn.textContent = 'Send Message →';
            btn.disabled = false;
            btn.style.background = '';
            btn.style.color = '';
            btn.style.border = '';
          }, 3500);
        } else {
          btn.textContent = 'Failed. Try again.';
          btn.style.color = 'red';
          btn.disabled = false;
          btn.style.opacity = '1';
        }
      })
      .catch(() => {
        btn.textContent = 'Error. Try again.';
        btn.style.color = 'red';
        btn.disabled = false;
        btn.style.opacity = '1';
      });
    });
  }

  function shakeForm(el) {
    el.style.animation = 'none';
    el.style.transition = 'transform 0.1s ease';

    const shakes = [6, -6, 4, -4, 2, -2, 0];
    let i = 0;
    const shake = () => {
      if (i >= shakes.length) {
        el.style.transform = '';
        return;
      }
      el.style.transform = `translateX(${shakes[i]}px)`;
      i++;
      setTimeout(shake, 60);
    };
    shake();
  }


  /* ──────────────────────────────
     8. SMOOTH SCROLL for anchors
  ────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ──────────────────────────────
     9. TYPING EFFECT — hero role
  ────────────────────────────── */
  const roleLabels = document.querySelectorAll('.role-label');
  const roles = ['Full Stack Developer', 'UI/UX Enthusiast', 'Open Source Lover', 'Problem Solver'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingTarget = roleLabels[0]; // animate first label

  if (typingTarget) {
    typingTarget.textContent = '';

    function typeRole() {
      const current = roles[roleIndex];

      if (!isDeleting) {
        typingTarget.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(typeRole, 1800);
          return;
        }
      } else {
        typingTarget.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      setTimeout(typeRole, isDeleting ? 55 : 90);
    }

    // Start with a delay
    setTimeout(typeRole, 1500);
  }


  /* ──────────────────────────────
     10. PARALLAX on orbs
  ────────────────────────────── */
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    if (orb1) orb1.style.transform = `translate(${dx * 30}px, ${dy * 30}px)`;
    if (orb2) orb2.style.transform = `translate(${dx * -20}px, ${dy * -20}px)`;
  });

});
