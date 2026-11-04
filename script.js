(() => {
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const screens=$$('.screen');let language='ar',current='welcome';
function setLanguage(lang){language=lang==='en'?'en':'ar';document.documentElement.lang=language;document.documentElement.dir=language==='ar'?'rtl':'ltr';$$('[data-ar][data-en]').forEach(el=>{const value=el.dataset[language];if(value!==undefined)el.textContent=value});$('#langBtn').textContent=language==='ar'?'English':'العربية';$('#chatInput').placeholder=language==='ar'?'اكتب سؤالك...':'Ask your question...';try{localStorage.setItem('soularab-language',language)}catch(e){}}
try{setLanguage(localStorage.getItem('soularab-language')||'ar')}catch(e){setLanguage('ar')}
function showScreen(id){screens.forEach(s=>s.classList.toggle('active',s.id===id));current=id;window.scrollTo({top:0,behavior:'smooth'});if(id==='menu')$('#roohLaunch').hidden=false}
function clickSound(){}
$('#langBtn').addEventListener('click',()=>{setLanguage(language==='ar'?'en':'ar');clickSound()});
$$('[data-screen]').forEach(btn=>btn.addEventListener('click',()=>{clickSound();showScreen(btn.dataset.screen)}));
$$('.back-btn,.back-text').forEach(btn=>btn.addEventListener('click',()=>{clickSound();showScreen('menu')}));
function enter(){clickSound();showScreen('menu')}
const swipeTrack=$('#swipeTrack');let dragging=false,completed=false;
function moveSwipe(e){if(!dragging||completed)return;const rect=swipeTrack.getBoundingClientRect();const x=Math.max(0,Math.min(rect.width,e.clientX-rect.left));const p=x/rect.width;swipeTrack.style.setProperty('--swipe-x',(p*100)+'%');swipeTrack.setAttribute('aria-valuenow',String(Math.round(p*100)));if(p>=.985){completed=true;dragging=false;try{swipeTrack.releasePointerCapture(e.pointerId)}catch(_){}enter()}}
swipeTrack.addEventListener('pointerdown',e=>{if(completed)return;const rect=swipeTrack.getBoundingClientRect();const x=e.clientX-rect.left;if(x>rect.width*.22)return;dragging=true;swipeTrack.style.setProperty('--swipe-x',(Math.max(0,x/rect.width*100))+'%');swipeTrack.setAttribute('aria-valuenow',String(Math.round(x/rect.width*100)));try{swipeTrack.setPointerCapture(e.pointerId)}catch(_){}e.preventDefault()});
swipeTrack.addEventListener('pointermove',moveSwipe);function endSwipe(){if(!dragging)return;dragging=false;swipeTrack.style.setProperty('--swipe-x','0%');swipeTrack.setAttribute('aria-valuenow','0')}
swipeTrack.addEventListener('pointerup',endSwipe);swipeTrack.addEventListener('pointercancel',endSwipe);
swipeTrack.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='End'){e.preventDefault();completed=true;enter()}});

$$('.gallery-item').forEach(item=>item.addEventListener('click',()=>{$('#imageViewer').hidden=false;$('#imageViewer img').src=item.dataset.preview}));
$('#closeViewer').addEventListener('click',()=>$('#imageViewer').hidden=true);$('#imageViewer').addEventListener('click',e=>{if(e.target.id==='imageViewer')e.currentTarget.hidden=true});
$('#musicToggle').addEventListener('click',()=>$('#musicTab').classList.toggle('open'));
const rooh=$('#roohChat');$('#roohLaunch').addEventListener('click',()=>{rooh.hidden=!rooh.hidden;clickSound()});$('#closeChat').addEventListener('click',()=>rooh.hidden=true);
const answers={
services:{ar:'نقدم تصميم الشعارات والهويات التجارية والتصميم الجرافيكي ودعوات الزفاف، إضافة إلى المواقع الإلكترونية والحلول الرقمية وواجهات المستخدم وتطبيقات الهاتف. يمكنك فتح شاشة «خدماتنا» للتفاصيل.',en:'We offer logo and brand identity design, graphic design, wedding invitations, websites, digital solutions, user interfaces and mobile apps. Open the Services screen for details.'},
contact:{ar:'يمكنك مراسلتنا عبر واتساب على الرقم +971 52 598 7033 أو البريد Abdulkaderbinshy@gmail.com. يسعدنا التواصل معك.',en:'Reach us on WhatsApp at +971 52 598 7033 or email Abdulkaderbinshy@gmail.com. We look forward to hearing from you.'},
location:{ar:'مقر SOULARAB TECH في حلب، سوريا، ونخدم عملاءنا حول العالم عن بُعد.',en:'SOULARAB TECH is based in Aleppo, Syria, and serves clients worldwide remotely.'},
process:{ar:'نبدأ بفهم احتياجك، ثم نتفق على التفاصيل والمدة والتكلفة، وبعدها ننفذ العمل ونسلم الملفات بالصيغ المتفق عليها.',en:'We understand your needs, agree on scope, timeline and price, then create and deliver the agreed files.'}
};
function addMessage(text,cls){const p=document.createElement('p');p.className=cls;p.textContent=text;$('#chatBody').append(p);$('#chatBody').scrollTop=$('#chatBody').scrollHeight}
function answerQuestion(q){const text=answers[q]?.[language]||(language==='ar'?'يسعدني مساعدتك! يمكنني توضيح خدماتنا أو طرق التواصل أو موقع الشركة. ولأي سؤال تفصيلي غير متوفر لدي، تواصل معنا مباشرة عبر واتساب.':'Happy to help! I can explain our services, contact details or location. For anything more specific, please contact us directly on WhatsApp.');addMessage(text,'bot-message')}
$$('[data-question]').forEach(b=>b.addEventListener('click',()=>{addMessage(b.textContent,'user-message');answerQuestion(b.dataset.question)}));
$('#chatForm').addEventListener('submit',e=>{e.preventDefault();const input=$('#chatInput'),q=input.value.trim();if(!q)return;addMessage(q,'user-message');input.value='';const normalized=q.toLowerCase();let key=normalized.match(/خدم|service|تصميم|design/)?'services':normalized.match(/تواصل|واتساب|بريد|contact|email|whatsapp/)?'contact':normalized.match(/أين|وين|مقر|location|based/)?'location':normalized.match(/كيف.*عمل|طريقة|process/)?'process':null;answerQuestion(key)});
$('#orderForm').addEventListener('submit',e=>{e.preventDefault();const name=$('#orderName').value.trim(),service=$('#orderService').selectedOptions[0].textContent.trim(),details=$('#orderDetails').value.trim();const msg=language==='ar'?'طلب خدمة جديد من SOULARAB TECH\nالاسم: '+name+'\nالخدمة: '+service+'\nتفاصيل المشروع: '+details:'New service request from SOULARAB TECH\nName: '+name+'\nService: '+service+'\nProject details: '+details;window.open('https://wa.me/971525987033?text='+encodeURIComponent(msg),'_blank','noopener,noreferrer')});
$('#year').textContent=new Date().getFullYear();
setInterval(()=>{const b=$('#roohLaunch');if(!b.hidden&&rooh.hidden){b.classList.remove('wave');void b.offsetWidth;b.classList.add('wave')}},600000);
})();