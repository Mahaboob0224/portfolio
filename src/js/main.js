// Intersection Observer for animation on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      elements.forEach(element => {
        observer.observe(element);
      });
    };
    
    // Smooth scrolling for navigation links
    const smoothScroll = () => {
      const navLinks = document.querySelectorAll('.nav-link');
      
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          
          const targetId = link.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          
          if (targetSection) {
            const offsetTop = targetSection.offsetTop;
            
            window.scrollTo({
              top: offsetTop - 80, // Adjust for header height
              behavior: 'smooth'
            });
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('nav-menu');
            const menuToggle = document.getElementById('menu-toggle');
            if (mobileMenu && mobileMenu.classList.contains('open')) {
              mobileMenu.classList.remove('open');
              menuToggle.classList.remove('open');
            }
          }
        });
      });
    };
    
    // Contact form validation
    const setupContactForm = () => {
      const form = document.getElementById('contact-form');
      if (!form) return;
      
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name) {
          showValidationError('name', 'Please enter your name');
          return;
        }
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          showValidationError('email', 'Please enter a valid email address');
          return;
        }
        
        if (!subject) {
          showValidationError('subject', 'Please enter a subject');
          return;
        }
        
        if (!message) {
          showValidationError('message', 'Please enter a message');
          return;
        }
        
        // Form is valid - would normally submit to server
        showFormSuccess();
      });
      
      // Clear validation errors on input
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('input', () => {
          clearValidationError(input.id);
        });
      });
    };
    
    const showValidationError = (fieldId, message) => {
      const field = document.getElementById(fieldId);
      const errorElement = document.getElementById(`${fieldId}-error`);
      
      field.style.borderColor = 'var(--error-color)';
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
      }
    };
    
    const clearValidationError = (fieldId) => {
      const field = document.getElementById(fieldId);
      const errorElement = document.getElementById(`${fieldId}-error`);
      
      field.style.borderColor = '';
      if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.add('hidden');
      }
    };
    
    const showFormSuccess = () => {
      const form = document.getElementById('contact-form');
      const successMessage = document.getElementById('form-success');
      
      form.reset();
      successMessage.classList.remove('hidden');
      
      setTimeout(() => {
        successMessage.classList.add('hidden');
      }, 5000);
    };
    
    // Header scroll effect
    const setupHeaderScroll = () => {
      const header = document.getElementById('header');
      if (!header) return;
      
      const scrollThreshold = 50;
      
      const updateHeaderClass = () => {
        if (window.scrollY > scrollThreshold) {
          header.classList.add('header-scrolled');
        } else {
          header.classList.remove('header-scrolled');
        }
      };
      
      window.addEventListener('scroll', updateHeaderClass);
      updateHeaderClass(); // Initial check
    };
    
    // Mobile menu toggle
    const setupMobileMenu = () => {
      const menuToggle = document.getElementById('menu-toggle');
      const mobileMenu = document.getElementById('nav-menu');
      if (!menuToggle || !mobileMenu) return;
      
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        menuToggle.classList.toggle('open');
      });
    };
    
    // Highlight current section in navigation
    const highlightCurrentSection = () => {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');
      
      window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          
          if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
          }
        });
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
          }
        });
      });
    };
    
    // Skill bar animation
    const animateSkillBars = () => {
      const skillBars = document.querySelectorAll('.skill-level');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            
            setTimeout(() => {
              entry.target.style.width = width;
            }, 100);
            
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      skillBars.forEach(bar => {
        observer.observe(bar);
      });
    };
    
    // Initialize all functionality
    animateOnScroll();
    smoothScroll();
    setupContactForm();
    setupHeaderScroll();
    setupMobileMenu();
    highlightCurrentSection();
    animateSkillBars();
  });