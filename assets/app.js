
(() => {
 const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
 const loader=$('#preloader');
 const finish=()=>{if(loader)loader.classList.add('done');document.body.classList.remove('loading')};
 window.addEventListener('load',()=>setTimeout(finish,420),{once:true});
 setTimeout(finish,1800);
 const header=$('.site-header');const onScroll=()=>{if(header)header.classList.toggle('scrolled',window.scrollY>24)};
 window.addEventListener('scroll',onScroll,{passive:true});onScroll();
 const toggle=$('.nav-toggle'),links=$('.nav-links');
 if(toggle&&links)toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});
 if(links)$$('a',links).forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}));
 const reveal=$$('.reveal');
 if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -35px 0px'});reveal.forEach(el=>io.observe(el))}else reveal.forEach(el=>el.classList.add('visible'));
 $$('.faq-question').forEach(btn=>btn.addEventListener('click',()=>{const item=btn.closest('.faq-item');const was=item.classList.contains('open');$$('.faq-item').forEach(x=>{x.classList.remove('open');$('.faq-question',x)?.setAttribute('aria-expanded','false')});if(!was){item.classList.add('open');btn.setAttribute('aria-expanded','true')}}));
 const range=$('#balance'),amount=$('#balanceValue'),yieldOut=$('#yieldValue'),lift=$('#liftValue'),monthly=$('#monthlyValue'),annual=$('#annualBtn'),month=$('#monthlyBtn');let annualMode=false;
 const fmt=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
 const calc=()=>{if(!range)return;const n=Number(range.value),net=n*(.0485-.0012),year=net; if(amount)amount.textContent=fmt(n);if(yieldOut)yieldOut.textContent=fmt(n*.0485);if(lift)lift.textContent='+'+fmt(3480*(n/1250000))+' / yr';if(monthly)monthly.textContent=fmt(n*.0485/12)};
 range?.addEventListener('input',calc);annual?.addEventListener('click',()=>{annualMode=true;annual.classList.add('active');month?.classList.remove('active');calc()});month?.addEventListener('click',()=>{annualMode=false;month.classList.add('active');annual?.classList.remove('active');calc()});calc();
 const contact=$('#contactForm');contact?.addEventListener('submit',e=>{e.preventDefault();const msg=$('#formFeedback');if(!contact.reportValidity())return;if(msg)msg.textContent='Thank you. Your consultation request is ready for the Fino advisory team (frontend demo).';contact.reset()});
 const auth=$('#authForm');auth?.addEventListener('submit',e=>{e.preventDefault();if(!auth.reportValidity())return;const data=new FormData(auth);const email=data.get('email');if(auth.dataset.mode==='signup'&&data.get('password')!==data.get('confirm')){$('#authFeedback').textContent='Your passwords do not match.';return}localStorage.setItem('fino-demo-user',JSON.stringify({email,createdAt:new Date().toISOString()}));$('#authFeedback').textContent=auth.dataset.mode==='signup'?'Demo account created. You can now sign in.':'Welcome back. Demo sign-in successful.';});
 $$('.social-auth button').forEach(b=>b.addEventListener('click',()=>{const f=$('#authFeedback');if(f)f.textContent='Social sign-in is a visual frontend demo and is not connected to an identity provider.'}));
 $$('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
})();
