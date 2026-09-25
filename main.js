(function(){
  /* ============================================================
     CONFIGURAÇÃO DO FORMULÁRIO
     Cole aqui a URL que recebe os leads (Formspree, RD Station,
     HubSpot, Make/Zapier, endpoint próprio…). Vazio = apenas simula.
     ============================================================ */
  const FORM_ENDPOINT = '';

  /* ---------- Nav fixa ---------- */
  const nav=document.getElementById('nav'),btn=document.getElementById('menuBtn');
  const onScroll=()=>{nav.classList.toggle('scrolled',scrollY>8);nav.classList.toggle('at-top',scrollY<=8)};onScroll();addEventListener('scroll',onScroll,{passive:true});
  const setMenu=o=>{nav.classList.toggle('open',o);btn.setAttribute('aria-expanded',o);btn.setAttribute('aria-label',o?'Fechar menu':'Abrir menu');document.documentElement.classList.toggle('menu-open',o)};
  btn.addEventListener('click',()=>setMenu(!nav.classList.contains('open')));
  addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){setMenu(false);btn.focus()}});
  matchMedia('(min-width:1101px)').addEventListener('change',e=>{if(e.matches)setMenu(false)});
  document.querySelectorAll('#navLinks a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  const links=[...document.querySelectorAll('.nav-links a[href^="#"]')].filter(a=>a.getAttribute('href')!=='#orcamento');
  const map=new Map(links.map(a=>[a.getAttribute('href').slice(1),a]));
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.remove('active'));const a=map.get(e.target.id);if(a)a.classList.add('active')}})},{rootMargin:'-45% 0px -50% 0px'});map.forEach((a,id)=>{const s=document.getElementById(id);if(s)io.observe(s)})}

  /* ---------- Formulário ---------- */
  const form=document.getElementById('leadForm'),ok=document.getElementById('formOk');
  const tel=document.getElementById('f-tel');
  tel.addEventListener('input',()=>{let d=tel.value.replace(/\D/g,'').slice(0,11);tel.value=d.length>10?d.replace(/(\d{2})(\d{5})(\d{0,4})/,'($1) $2-$3'):d.length>6?d.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3'):d.length>2?d.replace(/(\d{2})(\d+)/,'($1) $2'):d});
  function check(el){const f=el.closest('.field');let v=el.checkValidity();if(el===tel)v=el.value.replace(/\D/g,'').length>=10;f.classList.toggle('invalid',!v);return v}
  form.querySelectorAll('[required]').forEach(el=>el.addEventListener('blur',()=>check(el)));
  form.addEventListener('submit',e=>{e.preventDefault();let first=null;form.querySelectorAll('[required]').forEach(el=>{if(!check(el)&&!first)first=el});
    if(first){first.focus();return}
    const data=Object.fromEntries(new FormData(form));
    const done=()=>{document.getElementById('okName').textContent=data.nome.split(' ')[0];form.hidden=true;ok.hidden=false;};
    if(!FORM_ENDPOINT){console.log('Lead Método (simulação)',data);done();return}
    const sb=document.getElementById('submitBtn');const label=sb.textContent;sb.disabled=true;sb.textContent='Enviando…';
    fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
      .then(r=>{if(!r.ok)throw new Error(r.status);done()})
      .catch(()=>{alert('Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp (19) 99292-6378.')})
      .finally(()=>{sb.disabled=false;sb.textContent=label});
  });
  document.getElementById('againBtn').addEventListener('click',()=>{form.reset();ok.hidden=true;form.hidden=false});

  /* ---------- Animações de entrada ---------- */
  (function(){
    if(!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const groups=['.sec-head','.seg-head','.pain-card','.sys','.seg-strip li','.since','.diff-list li','.case','.steps li','.lead-info','.lead-form'];
    const els=[];
    groups.forEach(sel=>document.querySelectorAll('main '+sel).forEach(el=>{
      if(el.closest('.hero'))return;
      const sib=[...el.parentNode.children].filter(c=>c.matches(sel));
      el.style.setProperty('--d',(Math.min(sib.indexOf(el),5)*0.08)+'s');
      el.classList.add('reveal');els.push(el);
    }));
    document.documentElement.classList.add('anim');
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.12});
    els.forEach(el=>io.observe(el));
  })();
  document.getElementById('yr').textContent=new Date().getFullYear();
})();
