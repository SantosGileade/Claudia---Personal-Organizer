// script.js - clean and focused on modal, scroll, form and whatsapp.
// Keep this file linked as <script src="script.js" defer></script>

document.addEventListener('DOMContentLoaded', function () {
  // Set current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Elements
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImg = document.getElementById('modalImg');
  const closeModalBtn = document.getElementById('closeModal');
  const btnTopo = document.getElementById('btn-topo');

  // Open modal when clicking a thumb (uses data-img and data-title)
  document.querySelectorAll('.thumb').forEach(thumb => {
    thumb.addEventListener('click', function (e) {
      const imgSrc = thumb.getAttribute('data-img') || thumb.querySelector('img')?.src;
      const title = thumb.getAttribute('data-title') || thumb.querySelector('img')?.alt || '';
      if (!imgSrc) return;

      modalImg.src = imgSrc;
      modalImg.alt = title || 'Imagem';
      if (modalTitle) modalTitle.textContent = title || '';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      // block background scroll
      document.body.style.overflow = 'hidden';
      // focus for accessibility
      closeModalBtn?.focus();
    });
  });

  // Close function
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // clear image src to free memory
    if (modalImg) modalImg.src = '';
  }

  // Close button
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Click outside image -> close
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Contact form (demo behavior - keeps original logic)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nome = document.getElementById('nome')?.value.trim();
      const tel = document.getElementById('telefone')?.value.trim();
      const serv = document.getElementById('servico')?.value || '';
      if (!nome || !tel) { alert('Por favor, preencha nome e telefone.'); return; }

      const assunto = encodeURIComponent('Solicitação de orçamento - ' + serv);
      const corpo = encodeURIComponent(`Olá, meu nome é ${nome} Telefone: ${tel} Serviço: ${serv} Mensagem: ${document.getElementById('mensagem')?.value || ''}`);
      window.location.href = `mailto:${document.getElementById('emailPlaceholder')?.textContent || ''}?subject=${assunto}&body=${corpo}`;
    });
  }

  // WhatsApp button (replace phone if needed)
  const whatsappBtn = document.getElementById('whatsappBtn');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function () {
      const phone = '5521983041732'; // troque aqui se precisar
      const serv = document.getElementById('servico')?.value || '';
      const nome = document.getElementById('nome')?.value || 'Cliente';
      const mensagem = encodeURIComponent(`Olá! Meu nome é ${nome} e quero informações sobre: ${serv}`);
      if (phone.includes('X')) {
        alert('Substitua o número de WhatsApp no código pelo número real para abrir automaticamente o WhatsApp.');
        return;
      }
      window.open(`https://wa.me/${phone}?text=${mensagem}`, '_blank');
    });
  }

  // Smooth scroll for same-page anchors (JS fallback)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetSelector = this.getAttribute('href');
      if (!targetSelector || targetSelector === '#' ) return;
      const target = document.querySelector(targetSelector);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Back to top button behavior (uses id #btn-topo)
  window.addEventListener('scroll', function () {
    if (!btnTopo) return;
    btnTopo.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  if (btnTopo) {
    btnTopo.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
