(() => {
  const ready = (callback) => {
    if (document.readyState !== 'loading') callback();
    else document.addEventListener('DOMContentLoaded', callback, { once: true });
  };

  ready(() => {
    if (window.AOS) {
      AOS.init({ once: true, duration: 760, easing: 'ease-out-cubic', offset: 80 });
    }

    const progress = document.querySelector('.reading-progress span');
    if (progress) {
      const updateProgress = () => {
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const pct = height > 0 ? (window.scrollY / height) * 100 : 0;
        progress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
      };
      updateProgress();
      window.addEventListener('scroll', updateProgress, { passive: true });
    }

    const toc = document.getElementById('toc');
    if (toc) {
      const headings = [...document.querySelectorAll('.prose h2, .prose h3')];
      const fragment = document.createDocumentFragment();
      headings.forEach((heading, index) => {
        if (!heading.id) heading.id = `section-${index + 1}`;
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.style.paddingLeft = heading.tagName === 'H3' ? '1.35rem' : '.75rem';
        fragment.appendChild(link);
      });
      toc.appendChild(fragment);
    }

    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length) {
      const animateCounter = (element) => {
        const target = Number(element.dataset.counter || '0');
        const suffix = element.dataset.suffix || '';
        const duration = 1200;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min(1, (now - start) / duration);
          const value = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
          element.textContent = `${value}${suffix}`;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.45 });
      counters.forEach((counter) => observer.observe(counter));
    }

    if (window.Swiper && document.querySelector('.testimonial-swiper')) {
      new Swiper('.testimonial-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: { delay: 3600, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
      });
    }

    const hero = document.querySelector('[data-hero]');
    const heroLight = document.querySelector('[data-hero-light]');
    if (hero && heroLight) {
      hero.addEventListener('pointermove', (event) => {
        const rect = hero.getBoundingClientRect();
        heroLight.style.transform = `translate(${event.clientX - rect.left - 160}px, ${event.clientY - rect.top - 160}px)`;
      }, { passive: true });
    }

    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
      const context = canvas.getContext('2d');
      const particles = [];
      const density = Math.min(72, Math.max(28, Math.floor(window.innerWidth / 22)));
      const resize = () => {
        const rect = canvas.parentElement.getBoundingClientRect();
        const ratio = window.devicePixelRatio || 1;
        canvas.width = rect.width * ratio;
        canvas.height = rect.height * ratio;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
      };
      const seed = () => {
        particles.length = 0;
        const width = canvas.parentElement.clientWidth;
        const height = canvas.parentElement.clientHeight;
        for (let index = 0; index < density; index += 1) {
          particles.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - .5) * .34, vy: (Math.random() - .5) * .34, r: Math.random() * 1.8 + .7 });
        }
      };
      const draw = () => {
        const width = canvas.parentElement.clientWidth;
        const height = canvas.parentElement.clientHeight;
        context.clearRect(0, 0, width, height);
        particles.forEach((particle, index) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < 0 || particle.x > width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > height) particle.vy *= -1;
          context.beginPath();
          context.fillStyle = 'rgba(147,197,253,.72)';
          context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
          context.fill();
          for (let j = index + 1; j < particles.length; j += 1) {
            const other = particles[j];
            const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
            if (distance < 135) {
              context.strokeStyle = `rgba(91,95,255,${(1 - distance / 135) * .22})`;
              context.lineWidth = 1;
              context.beginPath();
              context.moveTo(particle.x, particle.y);
              context.lineTo(other.x, other.y);
              context.stroke();
            }
          }
        });
        requestAnimationFrame(draw);
      };
      resize();
      seed();
      draw();
      window.addEventListener('resize', () => { resize(); seed(); }, { passive: true });
    }

    if (window.gsap) {
      gsap.from('[data-hero-title]', { y: 28, opacity: 0, duration: .85, ease: 'power3.out' });
      gsap.from('[data-hero-subtitle]', { y: 20, opacity: 0, duration: .85, delay: .12, ease: 'power3.out' });
      gsap.from('[data-hero-actions]', { y: 18, opacity: 0, duration: .85, delay: .24, ease: 'power3.out' });
    }
  });
})();
