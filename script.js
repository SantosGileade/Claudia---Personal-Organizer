    // Set current year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Portfolio modal functionality
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImg = document.getElementById('modalImg');
    const closeModal = document.getElementById('closeModal');
    
    // Open modal when clicking on portfolio images
    document.querySelectorAll('.thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        const title = thumb.getAttribute('data-title');
        const imgSrc = thumb.getAttribute('data-img');
        
        modalTitle.textContent = title;
        modalImg.src = imgSrc;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
      });
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      }
    });

    // Back to top button
    const btnTopo = document.getElementById('btn-topo');
    
    if (btnTopo) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          btnTopo.style.display = 'block';
        } else {
          btnTopo.style.display = 'none';
        }
      });
      
      btnTopo.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Form handling
    const contactForm = document.getElementById('contactForm');
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const nome = formData.get('nome');
      const telefone = formData.get('telefone');
      const email = formData.get('email');
      const servico = formData.get('servico');
      const mensagem = formData.get('mensagem');
      
      // Aqui você pode integrar com seu backend ou serviço de email
      alert(`Obrigada pelo contato, ${nome}! Em breve entraremos em contato.`);
      
      // Opcional: enviar para WhatsApp automaticamente
      const whatsappMessage = `Olá! Meu nome é ${nome}. Gostaria de solicitar o serviço: ${servico}. ${mensagem ? 'Mensagem: ' + mensagem : ''}`;
      const whatsappUrl = `https://wa.me/5521983041732?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
    });
    
    whatsappBtn.addEventListener('click', () => {
      const whatsappUrl = 'https://wa.me/5521983041732?text=Olá! Gostaria de saber mais sobre os serviços de organização.';
      window.open(whatsappUrl, '_blank');
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Mobile menu toggle (caso queira implementar depois)
    // Código para menu hambúrguer pode ser adicionado aqui
