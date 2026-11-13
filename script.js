const header=document.querySelector('#header');const menu=document.querySelector('.menu-button');const mobile=document.querySelector('.mobile-nav');window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>30));menu.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.textContent=open?'CLOSE':'MENU'});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');menu.textContent='MENU';menu.setAttribute('aria-expanded','false')}));
const signupForm = document.querySelector('#signup');
if (signupForm) {
  const emailInput = signupForm.elements.email;
  const note = document.querySelector('#form-note');
  const storageKey = 'kkm:mailing-list:test';
  const sampleEmail = /^[^@\s]+@example\.com$/i;

  emailInput.addEventListener('input', () => {
    emailInput.setCustomValidity('');
    note.textContent = '';
  });

  signupForm.addEventListener('submit', event => {
    event.preventDefault();
    const email = emailInput.value.trim().toLowerCase();
    if (!sampleEmail.test(email)) {
      emailInput.setCustomValidity('Use a test address ending in @example.com.');
      emailInput.reportValidity();
      return;
    }

    try {
      const subscribers = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
      if (subscribers.includes(email)) {
        note.textContent = 'This test address is already on the list in this browser.';
        return;
      }
      localStorage.setItem(storageKey, JSON.stringify([...subscribers, email]));
      signupForm.reset();
      note.textContent = 'Test signup saved in this browser. No email was sent.';
    } catch {
      note.textContent = 'This browser could not save the test signup.';
    }
  });

  signupForm.querySelector('button[type="submit"]').disabled = false;
}

const liveStream={isLive:false,liveUrl:'',offlineLabel:'Latest Bible Study →',offlineHref:'#watch'};const liveCta=document.querySelector('#hero-live-cta');if(liveCta){if(liveStream.isLive&&liveStream.liveUrl){liveCta.textContent='● LIVE NOW';liveCta.href=liveStream.liveUrl;liveCta.target='_blank';liveCta.rel='noopener noreferrer'}else{liveCta.textContent=liveStream.offlineLabel;liveCta.href=liveStream.offlineHref;liveCta.removeAttribute('target');liveCta.removeAttribute('rel')}}

const sectionAnchors={watch:'.section-head',mission:'.portrait',shop:'.section-head',ignited:'.ignited-content',book:'.epk-card',support:'.kicker',join:'.kicker'};const sectionCorrections={support:-88};document.querySelectorAll('a[href^="#"]').forEach(link=>{link.addEventListener('click',e=>{const id=link.getAttribute('href').slice(1);const target=document.getElementById(id);if(!target)return;e.preventDefault();const selector=sectionAnchors[id];const anchor=selector?target.querySelector(selector):target;const headerHeight=64;let top;if(id==='ignited'){const rect=target.getBoundingClientRect();top=rect.bottom+window.scrollY-window.innerHeight-56}else if((id==='mission'||id==='book')&&anchor){const rect=anchor.getBoundingClientRect();const visibleCenter=headerHeight+(window.innerHeight-headerHeight)/2;top=rect.top+window.scrollY+(rect.height/2)-visibleCenter}else{const breathingRoom=24;const correction=sectionCorrections[id]??0;top=(anchor||target).getBoundingClientRect().top+window.scrollY-headerHeight-breathingRoom+correction}window.scrollTo({top,behavior:'smooth'});history.replaceState(null,'','#'+id)})});