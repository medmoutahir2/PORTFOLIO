/**
 * ===================================================================
 * PORTFOLIO MAIN JAVASCRIPT
 * Mohamed Moutahir — Portfolio
 * ===================================================================
 * Handles UI interactions, dynamic rendering from config.js,
 * theme management, canvas animation, scroll reveal, and form validation.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Safe reference to CONFIG object
  const config = typeof CONFIG !== 'undefined' ? CONFIG : {};

  /**
   * Helper: Escape HTML to avoid injection when rendering strings
   * @param {string} str
   * @returns {string}
   */
  const escapeHtml = (str) => {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  /**
   * Check if user prefers reduced motion
   * @returns {boolean}
   */
  const prefersReducedMotion = () => {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  /* ===================================================================
   * 1. THEME TOGGLE
   * =================================================================== */
  const initTheme = () => {
    const html = document.documentElement;
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const STORAGE_KEY = 'portfolio-theme';

    /**
     * Determines initial theme:
     * 1. Check localStorage
     * 2. Check prefers-color-scheme
     * 3. Default to 'dark'
     */
    const getInitialTheme = () => {
      try {
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        if (savedTheme === 'light' || savedTheme === 'dark') {
          return savedTheme;
        }
      } catch (err) {
        console.warn('LocalStorage is not accessible:', err);
      }

      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }

      return 'dark';
    };

    /**
     * Updates HTML attribute, icon class, and saves to localStorage
     * @param {'dark'|'light'} theme
     */
    const applyTheme = (theme) => {
      html.setAttribute('data-theme', theme);

      if (themeIcon) {
        if (theme === 'dark') {
          themeIcon.className = 'ri-moon-line';
        } else {
          themeIcon.className = 'ri-sun-line';
        }
      }

      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (err) {
        console.warn('Unable to save theme to localStorage:', err);
      }
    };

    // Set initial theme
    const currentTheme = getInitialTheme();
    applyTheme(currentTheme);

    // Toggle listener
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const activeTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        applyTheme(activeTheme);
      });
    }

    // Listen to system theme changes if user has not explicitly chosen
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        try {
          if (!localStorage.getItem(STORAGE_KEY)) {
            applyTheme(e.matches ? 'dark' : 'light');
          }
        } catch {
          // ignore
        }
      });
    }
  };

  /* ===================================================================
   * 2. MOBILE NAVIGATION
   * =================================================================== */
  const initMobileNav = () => {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');

    if (!navToggle || !navLinks) return;

    /**
     * Set mobile menu open state
     * @param {boolean} isOpen
     */
    const setMenuOpen = (isOpen) => {
      if (isOpen) {
        navToggle.classList.add('active');
        navLinks.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      } else {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    };

    // Toggle button click
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      setMenuOpen(!isExpanded);
    });

    // Close menu when clicking any nav link
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        setMenuOpen(false);
      });
    });

    // Close menu when clicking outside the navbar
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active')) {
        if (!navbar || !navbar.contains(e.target)) {
          setMenuOpen(false);
        }
      }
    });

    // Close menu on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        setMenuOpen(false);
        navToggle.focus();
      }
    });
  };

  /* ===================================================================
   * 3. NAVBAR SCROLL EFFECT & BACK TO TOP BUTTON
   * =================================================================== */
  const initScrollEffects = () => {
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');
    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      // Navbar scrolled class (> 50px)
      if (navbar) {
        if (scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      // Back to top button (> 500px)
      if (backToTopBtn) {
        if (scrollY > 500) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }

      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(handleScroll);
          ticking = true;
        }
      },
      { passive: true }
    );

    // Initial check on load
    handleScroll();

    // Back to top click event
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        });
      });
    }
  };

  /* ===================================================================
   * 4. ACTIVE NAVIGATION LINK ON SCROLL
   * =================================================================== */
  const initActiveNavLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const navbar = document.getElementById('navbar');

    if (!sections.length || !navLinks.length) return;

    const updateActiveSection = () => {
      const navHeight = navbar ? navbar.offsetHeight : 70;
      const scrollPos = (window.pageYOffset || document.documentElement.scrollTop) + navHeight + 100;

      let currentSectionId = '';

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = section.getAttribute('id');
        }
      });

      // Special check: at the very bottom of the page, activate the last visible section (e.g. contact)
      if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 50) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
          currentSectionId = lastSection.getAttribute('id');
        }
      }

      if (currentSectionId) {
        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href === `#${currentSectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    };

    let ticking = false;
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            updateActiveSection();
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );

    updateActiveSection();
  };

  /* ===================================================================
   * 5. SMOOTH SCROLL WITH NAVBAR OFFSET
   * =================================================================== */
  const initSmoothScroll = () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const navbar = document.getElementById('navbar');

    anchorLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const navHeight = navbar ? navbar.offsetHeight : 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          });

          // Update URL hash without jumping
          if (history.pushState) {
            history.pushState(null, '', targetId);
          }
        }
      });
    });
  };

  /* ===================================================================
   * 6. SCROLL REVEAL ANIMATIONS
   * =================================================================== */
  const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('active'));
      return;
    }

    // Assign staggered transition delays to consecutive reveal siblings in same container
    const parentGroups = new Map();
    revealElements.forEach((el) => {
      const parent = el.parentElement;
      if (!parentGroups.has(parent)) {
        parentGroups.set(parent, []);
      }
      parentGroups.get(parent).push(el);
    });

    parentGroups.forEach((children) => {
      if (children.length > 1) {
        children.forEach((child, index) => {
          const delay = (index % 6) * 0.1; // Stagger up to 0.5s max
          child.style.transitionDelay = `${delay.toFixed(1)}s`;
        });
      }
    });

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1,
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  };

  /* ===================================================================
   * 7. RENDER SKILLS SECTION
   * =================================================================== */
  const renderSkills = () => {
    const skillsGrid = document.getElementById('skillsGrid');
    if (!skillsGrid || !Array.isArray(config.skills)) return;

    /**
     * Map skill level text to corresponding CSS class
     * @param {string} level
     * @returns {string}
     */
    const getLevelClass = (level) => {
      if (!level) return '';
      const cleanLevel = level.trim().toLowerCase();
      if (cleanLevel.includes('pratique') || cleanLevel.includes('régulière')) {
        return 'practice';
      }
      if (cleanLevel.includes('apprentissage')) {
        return 'learning';
      }
      if (cleanLevel.includes('notion')) {
        return 'notions';
      }
      return 'practice';
    };

    const categoriesHtml = config.skills
      .map((cat) => {
        const itemsHtml = Array.isArray(cat.items)
          ? cat.items
              .map((item) => {
                const levelClass = getLevelClass(item.level);
                return `
                  <div class="skill-item">
                    <div class="skill-item-left">
                      <i class="${escapeHtml(item.icon || 'ri-code-line')}"></i>
                      <span class="skill-item-name">${escapeHtml(item.name)}</span>
                    </div>
                    <span class="skill-level ${levelClass}">${escapeHtml(item.level)}</span>
                  </div>`;
              })
              .join('')
          : '';

        return `
          <div class="skill-category reveal">
            <div class="skill-category-header">
              <div class="skill-category-icon"><i class="${escapeHtml(cat.icon || 'ri-tools-line')}"></i></div>
              <h3 class="skill-category-title">${escapeHtml(cat.category)}</h3>
            </div>
            <p class="skill-category-desc">${escapeHtml(cat.description)}</p>
            <div class="skill-items">
              ${itemsHtml}
            </div>
          </div>`;
      })
      .join('');

    skillsGrid.innerHTML = categoriesHtml;
  };

  /* ===================================================================
   * 8. RENDER PROJECTS SECTION
   * =================================================================== */
  const renderProjects = () => {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid || !Array.isArray(config.projects)) return;

    const projectsHtml = config.projects
      .map((project) => {
        const isUpcoming = project.status === 'upcoming';
        const cardClass = isUpcoming ? 'project-card reveal upcoming' : 'project-card reveal';

        // Image / Placeholder
        let imageHtml = '';
        if (project.image && project.image.trim() !== '') {
          imageHtml = `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" loading="lazy" />`;
        } else {
          imageHtml = `<i class="ri-code-box-line project-image-placeholder"></i>`;
        }

        // Status badge
        let statusText = project.status || '';
        if (project.status === 'completed') {
          statusText = 'Terminé';
        } else if (project.status === 'upcoming') {
          statusText = 'À venir';
        }

        // Tech badges
        const techHtml = Array.isArray(project.technologies)
          ? project.technologies.map((t) => `<span>${escapeHtml(t)}</span>`).join('')
          : '';

        // Project links
        let linksHtml = '';
        if (project.github && project.github !== '#' && project.github.trim() !== '') {
          linksHtml += `<a href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer" class="project-link github"><i class="ri-github-line"></i> Code</a>`;
        } else if (project.github === '#') {
          linksHtml += `<a href="#" class="project-link github" title="Lien GitHub à configurer"><i class="ri-github-line"></i> Code</a>`;
        }

        if (project.demo && project.demo !== '#' && project.demo.trim() !== '') {
          linksHtml += `<a href="${escapeHtml(project.demo)}" target="_blank" rel="noopener noreferrer" class="project-link demo"><i class="ri-external-link-line"></i> Démo</a>`;
        }

        return `
          <div class="${cardClass}">
            <div class="project-image">
              ${imageHtml}
              <span class="project-status ${escapeHtml(project.status || '')}">${escapeHtml(statusText)}</span>
            </div>
            <div class="project-content">
              <h3 class="project-title">${escapeHtml(project.title)}</h3>
              <p class="project-description">${escapeHtml(project.description)}</p>
              <div class="project-tech">
                ${techHtml}
              </div>
              <div class="project-links">
                ${linksHtml}
              </div>
            </div>
          </div>`;
      })
      .join('');

    projectsGrid.innerHTML = projectsHtml;
  };

  /* ===================================================================
   * 9. RENDER EDUCATION TIMELINE
   * =================================================================== */
  const renderEducation = () => {
    const timeline = document.getElementById('timeline');
    if (!timeline || !Array.isArray(config.education)) return;

    const timelineHtml = config.education
      .map((entry) => {
        const isCompleted = entry.status === 'completed';
        const iconClass = isCompleted ? 'ri-check-line' : 'ri-loader-4-line';

        return `
          <div class="timeline-item reveal">
            <div class="timeline-dot ${escapeHtml(entry.status || '')}">
              <i class="${iconClass}"></i>
            </div>
            <div class="timeline-content">
              <span class="timeline-period">${escapeHtml(entry.period)}</span>
              <h3 class="timeline-degree">${escapeHtml(entry.degree)}</h3>
              <p class="timeline-institution">${escapeHtml(entry.institution)}</p>
              <p class="timeline-location"><i class="ri-map-pin-line"></i> ${escapeHtml(entry.location)}</p>
              <p class="timeline-description">${escapeHtml(entry.description)}</p>
            </div>
          </div>`;
      })
      .join('');

    timeline.innerHTML = timelineHtml;
  };

  /* ===================================================================
   * 10. UPDATE CONTACT & FOOTER LINKS
   * =================================================================== */
  const updateContactAndFooter = () => {
    const contact = config.contact || {};

    // Contact section links
    const contactEmail = document.getElementById('contactEmail');
    if (contactEmail && contact.email) {
      contactEmail.href = `mailto:${contact.email}`;
      contactEmail.textContent = contact.email;
    }

    const contactLinkedin = document.getElementById('contactLinkedin');
    if (contactLinkedin && contact.linkedin) {
      contactLinkedin.href = contact.linkedin;
    }

    const contactGithub = document.getElementById('contactGithub');
    if (contactGithub && contact.github) {
      contactGithub.href = contact.github;
    }

    // Footer links
    const footerGithub = document.getElementById('footerGithub');
    if (footerGithub && contact.github) {
      footerGithub.href = contact.github;
    }

    const footerLinkedin = document.getElementById('footerLinkedin');
    if (footerLinkedin && contact.linkedin) {
      footerLinkedin.href = contact.linkedin;
    }

    const footerEmail = document.getElementById('footerEmail');
    if (footerEmail && contact.email) {
      footerEmail.href = `mailto:${contact.email}`;
    }

    // Current year in footer
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
    }

    // Optional: Personal avatar photo if configured
    if (config.personal && config.personal.photo && config.personal.photo.trim() !== '') {
      const avatarPlaceholder = document.getElementById('avatarPlaceholder');
      if (avatarPlaceholder) {
        avatarPlaceholder.innerHTML = `<img src="${escapeHtml(config.personal.photo)}" alt="${escapeHtml(config.personal.fullName || 'Mohamed Moutahir')}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />`;
      }
    }
  };

  /* ===================================================================
   * 11. CONTACT FORM VALIDATION & HANDLING
   * =================================================================== */
  const initContactForm = () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameInput = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const subjectInput = document.getElementById('formSubject');
    const messageInput = document.getElementById('formMessage');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /**
     * Show or clear error message
     * @param {HTMLElement|null} errorSpan
     * @param {string} message
     */
    const setError = (errorSpan, message) => {
      if (errorSpan) {
        errorSpan.textContent = message;
        if (message) {
          errorSpan.style.display = 'block';
        } else {
          errorSpan.style.display = 'none';
        }
      }
    };

    /**
     * Field validator functions
     */
    const validateName = () => {
      if (!nameInput) return true;
      const val = nameInput.value.trim();
      if (!val) {
        setError(nameError, 'Le nom est obligatoire.');
        nameInput.classList.add('invalid');
        return false;
      }
      if (val.length < 2) {
        setError(nameError, 'Le nom doit comporter au moins 2 caractères.');
        nameInput.classList.add('invalid');
        return false;
      }
      setError(nameError, '');
      nameInput.classList.remove('invalid');
      return true;
    };

    const validateEmail = () => {
      if (!emailInput) return true;
      const val = emailInput.value.trim();
      if (!val) {
        setError(emailError, "L'adresse e-mail est obligatoire.");
        emailInput.classList.add('invalid');
        return false;
      }
      if (!emailRegex.test(val)) {
        setError(emailError, 'Veuillez saisir une adresse e-mail valide.');
        emailInput.classList.add('invalid');
        return false;
      }
      setError(emailError, '');
      emailInput.classList.remove('invalid');
      return true;
    };

    const validateSubject = () => {
      if (!subjectInput) return true;
      const val = subjectInput.value.trim();
      if (!val) {
        setError(subjectError, 'Le sujet est obligatoire.');
        subjectInput.classList.add('invalid');
        return false;
      }
      if (val.length < 3) {
        setError(subjectError, 'Le sujet doit comporter au moins 3 caractères.');
        subjectInput.classList.add('invalid');
        return false;
      }
      setError(subjectError, '');
      subjectInput.classList.remove('invalid');
      return true;
    };

    const validateMessage = () => {
      if (!messageInput) return true;
      const val = messageInput.value.trim();
      if (!val) {
        setError(messageError, 'Le message est obligatoire.');
        messageInput.classList.add('invalid');
        return false;
      }
      if (val.length < 10) {
        setError(messageError, 'Le message doit comporter au moins 10 caractères.');
        messageInput.classList.add('invalid');
        return false;
      }
      setError(messageError, '');
      messageInput.classList.remove('invalid');
      return true;
    };

    // Real-time validation listeners
    if (nameInput) {
      nameInput.addEventListener('input', validateName);
      nameInput.addEventListener('blur', validateName);
    }
    if (emailInput) {
      emailInput.addEventListener('input', validateEmail);
      emailInput.addEventListener('blur', validateEmail);
    }
    if (subjectInput) {
      subjectInput.addEventListener('input', validateSubject);
      subjectInput.addEventListener('blur', validateSubject);
    }
    if (messageInput) {
      messageInput.addEventListener('input', validateMessage);
      messageInput.addEventListener('blur', validateMessage);
    }

    /**
     * Show user feedback modal/toast
     * @param {string} msg
     */
    const showFeedbackToast = (msg) => {
      // Create toast notification
      const toast = document.createElement('div');
      toast.className = 'form-toast-notification';
      toast.setAttribute('role', 'alert');
      toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: #1e293b;
        color: #f8fafc;
        border-left: 4px solid #3b82f6;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        font-family: inherit;
        font-size: 0.95rem;
        line-height: 1.5;
        max-width: 420px;
        transition: opacity 0.3s ease, transform 0.3s ease;
      `;
      toast.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
          <i class="ri-checkbox-circle-fill" style="color: #10b981; font-size: 1.4rem; line-height: 1;"></i>
          <div>
            <strong style="display: block; margin-bottom: 0.25rem;">Message simulé avec succès !</strong>
            <span>${msg}</span>
          </div>
        </div>
      `;
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
      }, 6000);
    };

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isSubjectValid = validateSubject();
      const isMessageValid = validateMessage();

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        const successMessage =
          "Merci pour votre message ! Ce portfolio de démonstration nécessite l'intégration d'un backend (ex: Formspree ou EmailJS) pour l'acheminement final des courriels.";
        showFeedbackToast(successMessage);
        form.reset();

        // Clear all validation errors
        setError(nameError, '');
        setError(emailError, '');
        setError(subjectError, '');
        setError(messageError, '');
        [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
          if (input) input.classList.remove('invalid');
        });
      }
    });
  };

  /* ===================================================================
   * 12. HERO CANVAS PARTICLES ANIMATION
   * =================================================================== */
  const initHeroCanvas = () => {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = null;
    let width = 0;
    let height = 0;
    let particles = [];
    const maxParticles = 48;
    const maxDistance = 110;

    /**
     * Particle Class
     */
    class Particle {
      constructor(w, h) {
        this.reset(w, h);
      }

      reset(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.radius = Math.random() * 1.8 + 1.2;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
      }

      update(w, h) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around bounds
        if (this.x < 0) this.x = w;
        else if (this.x > w) this.x = 0;

        if (this.y < 0) this.y = h;
        else if (this.y > h) this.y = 0;
      }

      draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(59, 130, 246, 0.5)';
        context.fill();
      }
    }

    /**
     * Resize canvas handling devicePixelRatio for crisp visuals
     */
    const resizeCanvas = () => {
      const parent = canvas.parentElement || canvas.closest('.hero');
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;

      canvas.width = width;
      canvas.height = height;

      // Adjust particle count based on screen area
      const count = Math.min(maxParticles, Math.floor((width * height) / 18000));
      particles = [];
      for (let i = 0; i < Math.max(20, count); i++) {
        particles.push(new Particle(width, height));
      }

      if (prefersReducedMotion()) {
        drawStaticScene();
      }
    };

    /**
     * Draw static snapshot when reduced motion is preferred
     */
    const drawStaticScene = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => p.draw(ctx));
    };

    /**
     * Connect close particles with thin lines
     */
    const connectParticles = () => {
      const len = particles.length;
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = 0.1 * (1 - dist / maxDistance);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    /**
     * Animation loop
     */
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update(width, height);
        p.draw(ctx);
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    /**
     * Start animation if permitted
     */
    const startAnimation = () => {
      if (prefersReducedMotion()) {
        drawStaticScene();
        return;
      }
      if (!animationFrameId) {
        animate();
      }
    };

    /**
     * Stop animation
     */
    const stopAnimation = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    // Initialize dimensions and particles
    resizeCanvas();
    startAnimation();

    // Resize listener with debouncing
    let resizeTimer;
    window.addEventListener(
      'resize',
      () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          resizeCanvas();
          if (!prefersReducedMotion() && !animationFrameId) {
            startAnimation();
          }
        }, 150);
      },
      { passive: true }
    );

    // Visibility change cleanup to pause resources
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    });
  };

  /* ===================================================================
   * 13. KEYBOARD ACCESSIBILITY
   * =================================================================== */
  const initKeyboardAccessibility = () => {
    // Enable Enter and Space trigger on custom button elements without native button behavior
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const target = e.target;
        if (target && target.getAttribute('role') === 'button' && target.tagName !== 'BUTTON') {
          e.preventDefault();
          target.click();
        }
      }
    });
  };

  /* ===================================================================
   * INITIALIZE ALL MODULES
   * =================================================================== */
  initTheme();
  initMobileNav();
  renderSkills();
  renderProjects();
  renderEducation();
  updateContactAndFooter();
  initScrollEffects();
  initActiveNavLink();
  initSmoothScroll();
  initScrollReveal(); // Initialize after rendering dynamic content
  initContactForm();
  initHeroCanvas();
  initKeyboardAccessibility();
});
