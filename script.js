    // Small interactions: modal, form submit, whatsapp
    document.getElementById('year').textContent = new Date().getFullYear();

    // Portfolio modal
    document.querySelectorAll('.thumb').forEach(t => {
      t.addEventListener('click', ()=>{
        const title = t.getAttribute('data-title');
        const src = t.getAttribute('data-img');
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalImg').src = src;
        document.getElementById('modal').classList.add('open');
        document.getElementById('modal').setAttribute('aria-hidden','false');
      })
    })
    document.getElementById('closeModal').addEventListener('click', ()=>{
      document.getElementById('modal').classList.remove('open');
      document.getElementById('modal').setAttribute('aria-hidden','true');
    })
    document.getElementById('modal').addEventListener('click', (e)=>{ if(e.target===document.getElementById('modal')){ document.getElementById('closeModal').click(); } })

    // Contact form: demo behaviour (no backend) — shows a friendly summary and suggests WhatsApp
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      const nome = document.getElementById('nome').value.trim();
      const tel = document.getElementById('telefone').value.trim();
      const serv = document.getElementById('servico').value;
      // simple validation
      if(!nome || !tel){ alert('Por favor, preencha nome e telefone.'); return; }

      // build message and open mailto as default action (developer can change to POST to backend later)
      const assunto = encodeURIComponent('Solicitação de orçamento - ' + serv);
      const corpo = encodeURIComponent(`Olá, meu nome é ${nome}%0ATelefone: ${tel}%0AServiço: ${serv}%0A%0AMensagem:%0A${document.getElementById('mensagem').value}`);
      // this will open the default mail client — change as needed
      window.location.href = `mailto:${document.getElementById('emailPlaceholder').textContent}?subject=${assunto}&body=${corpo}`;
    })

    // WhatsApp button opens link with phone in placeholder. Replace phone number below.
    document.getElementById('whatsappBtn').addEventListener('click', ()=>{
      // IMPORTANT: replace number with real one in international format without + or 0s, eg: 5511999998888
      const phone = '5521981905892'; // <-- substitua aqui pelo número da sua mãe (ex: 5521999998888)
      const serv = document.getElementById('servico').value;
      const nome = document.getElementById('nome').value || 'Cliente';
      const mensagem = encodeURIComponent(`Olá! Meu nome é ${nome} e quero informações sobre: ${serv}`);
      if(phone.includes('X')){
        alert('Substitua o número de WhatsApp no código pelo número real para abrir automaticamente o WhatsApp.');
        return;
      }
      window.open(`https://wa.me/${phone}?text=${mensagem}`, '_blank');
    })

    // small accessibility: keyboard close on modal
    document.addEventListener('keydown',(e)=>{ if(e.key==='Escape'){ document.getElementById('closeModal').click(); } })

      const btnTopo = document.getElementById("btn-topo");

      // Mostrar ou esconder botão quando rolar a página
      window.addEventListener("scroll", () => {
          if (window.scrollY > 300) {
              btnTopo.style.display = "block";
          } else {
              btnTopo.style.display = "none";
          }
      });
      
      // Ação ao clicar: rolar para o topo
      btnTopo.addEventListener("click", () => {
          window.scrollTo({
              top: 0,
              behavior: "smooth"
          });
      });
      
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
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
      


    // Replace placeholders easily via JS (optional)
    // You can set these values programmatically or keep them as editable text in HTML
    // document.getElementById('phonePlaceholder').textContent = '(21) 99999-9999';
    // document.getElementById('emailPlaceholder').textContent = 'mamae@exemplo.com';
