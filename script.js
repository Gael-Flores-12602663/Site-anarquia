const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const toast = document.querySelector('.toast');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2400);
}

document.querySelectorAll('[data-copy-ip]').forEach(button => {
  button.addEventListener('click', async () => {
    const ip = button.dataset.copyIp;

    if (!ip || ip === 'EM BREVE') {
      showToast('O IP será divulgado em breve.');
      return;
    }

    try {
      await navigator.clipboard.writeText(ip);
      showToast('IP copiado!');
    } catch {
      showToast(`IP: ${ip}`);
    }
  });
});

document.querySelectorAll('[data-placeholder="discord"]').forEach(button => {
  button.addEventListener('click', () => {
    showToast('O Discord oficial será adicionado em breve.');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => {
  observer.observe(element);
});

document.getElementById('year').textContent = new Date().getFullYear();
