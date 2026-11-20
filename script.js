(() => {
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const screens=$$('.screen');let language='ar',current='welcome';
function setLanguage(lang){language=lang==='en'?'en':'ar';document.documentElement.lang=language;document.documentElement.dir=language==='ar'?'rtl':'ltr';$$('[data-ar][data-en]').forEach(el=>{const value=el.dataset[language];if(value!==undefined)el.textContent=value});$('#langBtn').textContent=language==='ar'?'English':'العربية';$('#chatInput').placeholder=language==='ar'?'اكتب سؤالك...':'Ask your question...';try{localStorage.setItem('soularab-language',language)}catch(e){}}
try{setLanguage(localStorage.getItem('soularab-language')||'ar')}catch(e){setLanguage('ar')}
function showScreen(id,{history=true}={}){if(!screens.some(s=>s.id===id))return;screens.forEach(s=>s.classList.toggle('active',s.id===id));current=id;window.scrollTo({top:0,behavior:'smooth'});if(id==='menu')$('#roohLaunch').hidden=false;if(history){try{window.history.pushState({screen:id},'', '#'+id)}catch(_){}}}
try{window.history.replaceState({screen:current},'', '#welcome')}catch(_){}
window.addEventListener('popstate',e=>{const target=e.state?.screen||'welcome';showScreen(target,{history:false})});
function clickSound(){}
$('#langBtn').addEventListener('click',()=>{setLanguage(language==='ar'?'en':'ar');clickSound()});
$$('[data-screen]').forEach(btn=>btn.addEventListener('click',()=>{clickSound();showScreen(btn.dataset.screen)}));
$$('.back-btn').forEach(btn=>btn.addEventListener('click',()=>{clickSound();showScreen('menu')}));
$$('.back-text').forEach(btn=>btn.addEventListener('click',()=>{clickSound();showScreen(btn.dataset.screen||'menu')}));
function enter(){clickSound();showScreen('menu')}
const swipeTrack=$('#swipeTrack');let dragging=false,completed=false,activePointer=null;
function updateSwipe(e){
 if(!dragging||completed||e.pointerId!==activePointer)return;
 const rect=swipeTrack.getBoundingClientRect();
 const p=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));
 swipeTrack.style.setProperty('--swipe-x',(p*100)+'%');
 swipeTrack.setAttribute('aria-valuenow',String(Math.round(p*100)));
 if(p>=.97){
  completed=true;dragging=false;activePointer=null;
  try{swipeTrack.releasePointerCapture(e.pointerId)}catch(_){}
  enter();
 }
}
function startSwipe(e){
 if(completed||!e.isPrimary)return;
 dragging=true;activePointer=e.pointerId;
 try{swipeTrack.setPointerCapture(e.pointerId)}catch(_){}
 updateSwipe(e);
 e.preventDefault();
}
function finishSwipe(e){
 if(!dragging||e.pointerId!==activePointer)return;
 updateSwipe(e);
 if(completed)return;
 dragging=false;activePointer=null;
 swipeTrack.style.setProperty('--swipe-x','0%');
 swipeTrack.setAttribute('aria-valuenow','0');
}
function cancelSwipe(e){
 if(!dragging||e.pointerId!==activePointer)return;
 dragging=false;activePointer=null;
 swipeTrack.style.setProperty('--swipe-x','0%');
 swipeTrack.setAttribute('aria-valuenow','0');
}
swipeTrack.addEventListener('pointerdown',startSwipe);
swipeTrack.addEventListener('pointermove',updateSwipe);
swipeTrack.addEventListener('pointerup',finishSwipe);
swipeTrack.addEventListener('pointercancel',cancelSwipe);
swipeTrack.addEventListener('lostpointercapture',cancelSwipe);
swipeTrack.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='End'){e.preventDefault();completed=true;swipeTrack.style.setProperty('--swipe-x','100%');swipeTrack.setAttribute('aria-valuenow','100');enter()}});
const defaultProjects=[{title:'الشعار الرسمي SOULARAB TECH',image:'soularab-logo.png'}];
let projects=[],customSections=[];
function loadLocal(){try{projects=JSON.parse(localStorage.getItem('soularab-projects')||'null')||defaultProjects.map(x=>({...x}));customSections=JSON.parse(localStorage.getItem('soularab-sections')||'[]')}catch(_){projects=defaultProjects.map(x=>({...x}));customSections=[]}}
function persistLocal(){try{localStorage.setItem('soularab-projects',JSON.stringify(projects));localStorage.setItem('soularab-sections',JSON.stringify(customSections))}catch(e){alert('تعذر حفظ البيانات. ربما حجم الصور كبير؛ جرّب صورة أصغر.');}}
function renderGallery(){const grid=$('#galleryGrid');if(!grid)return;grid.replaceChildren();projects.forEach(p=>{const item=document.createElement('button');item.className='gallery-item';item.type='button';item.dataset.preview=p.image;const img=document.createElement('img');img.src=p.image;img.alt=p.title;const label=document.createElement('span');label.textContent=p.title;item.append(img,label);item.addEventListener('click',()=>{$('#imageViewer').hidden=false;$('#imageViewer img').src=p.image;$('#imageViewer img').alt=p.title});grid.append(item)});}
function renderCustomSections(){const grid=$('#galleryGrid');if(!grid)return;customSections.forEach(s=>{const card=document.createElement('article');card.className='custom-gallery-section';const h=document.createElement('h3');h.textContent=s.title;const p=document.createElement('p');p.textContent=s.text;card.append(h,p);grid.append(card)});}
function renderAdminLists(){const pList=$('#projectAdminList');pList.replaceChildren();projects.forEach((p,i)=>{const row=document.createElement('div');row.className='admin-row';const name=document.createElement('span');name.textContent=p.title;const up=document.createElement('button');up.textContent='↑';up.type='button';up.disabled=i===0;up.title='نقل للأعلى';up.onclick=()=>{[projects[i-1],projects[i]]=[projects[i],projects[i-1]];persistLocal();renderGallery();renderAdminLists()};const down=document.createElement('button');down.textContent='↓';down.type='button';down.disabled=i===projects.length-1;down.title='نقل للأسفل';down.onclick=()=>{[projects[i+1],projects[i]]=[projects[i],projects[i+1]];persistLocal();renderGallery();renderAdminLists()};const del=document.createElement('button');del.textContent='حذف';del.type='button';del.className='danger-mini';del.onclick=()=>{if(confirm('حذف هذا العمل من المعرض؟')){projects.splice(i,1);persistLocal();renderGallery();renderAdminLists()}};row.append(name,up,down,del);pList.append(row)});const sList=$('#sectionAdminList');sList.replaceChildren();customSections.forEach((s,i)=>{const row=document.createElement('div');row.className='admin-row';const name=document.createElement('span');name.textContent=s.title;const del=document.createElement('button');del.textContent='حذف';del.type='button';del.className='danger-mini';del.onclick=()=>{customSections.splice(i,1);persistLocal();renderGallery();renderAdminLists()};row.append(name,del);sList.append(row)})}
loadLocal();renderGallery();renderCustomSections();
$('#developerBtn').addEventListener('click',()=>{$('#developerModal').hidden=false;renderAdminLists()});
$('#closeDeveloper').addEventListener('click',()=>$('#developerModal').hidden=true);
$('#developerModal').addEventListener('click',e=>{if(e.target.id==='developerModal')e.currentTarget.hidden=true});
$('#addProject').addEventListener('click',async()=>{const title=$('#projectTitle').value.trim()||'مشروع جديد',url=$('#projectImageUrl').value.trim(),file=$('#projectImageFile').files[0];let image=url;if(file){if(file.size>1200000){alert('الحد الأقصى للصورة 1.2 ميغابايت لتخزينها محلياً.');return}image=await new Promise(resolve=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>resolve(null);reader.readAsDataURL(file)});}if(!image){alert('أضف رابط صورة أو اختر صورة من جهازك.');return}projects.push({title,image});persistLocal();renderGallery();renderAdminLists();$('#projectTitle').value='';$('#projectImageUrl').value='';$('#projectImageFile').value=''});
$('#addSection').addEventListener('click',()=>{const title=$('#sectionTitle').value.trim(),text=$('#sectionText').value.trim();if(!title||!text){alert('اكتب عنوان القسم ومحتواه.');return}customSections.push({title,text});persistLocal();renderGallery();renderAdminLists();$('#sectionTitle').value='';$('#sectionText').value=''});
$('#clearLocalEdits').addEventListener('click',()=>{if(confirm('سيتم حذف الصور والأقسام المحفوظة محلياً وإعادة المعرض الافتراضي. هل تريد المتابعة؟')){projects=defaultProjects.map(x=>({...x}));customSections=[];persistLocal();renderGallery();renderAdminLists()}});
const themeBtn=$('#themeBtn');function applyTheme(theme){document.documentElement.dataset.theme=theme;themeBtn.textContent=theme==='light'?'☾':'☼';themeBtn.setAttribute('aria-label',theme==='light'?'تفعيل الوضع الداكن':'تفعيل الوضع الفاتح');try{localStorage.setItem('soularab-theme',theme)}catch(_){}}
let savedTheme='dark';try{savedTheme=localStorage.getItem('soularab-theme')||'dark'}catch(_){}applyTheme(savedTheme);
themeBtn.addEventListener('click',()=>applyTheme(document.documentElement.dataset.theme==='light'?'dark':'light'));
$('.gallery-item').forEach(item=>item.addEventListener('click',()=>{$('#imageViewer').hidden=false;$('#imageViewer img').src=item.dataset.preview}));
$('#closeViewer').addEventListener('click',()=>$('#imageViewer').hidden=true);$('#imageViewer').addEventListener('click',e=>{if(e.target.id==='imageViewer')e.currentTarget.hidden=true});
$('#musicToggle').addEventListener('click',()=>$('#musicTab').classList.toggle('open'));
const rooh=$('#roohChat');$('#roohLaunch').addEventListener('click',()=>{rooh.hidden=!rooh.hidden;clickSound()});$('#closeChat').addEventListener('click',()=>rooh.hidden=true);
const answers={
services:{ar:'نقدم تصميم الشعارات والهويات التجارية والتصميم الجرافيكي ودعوات الزفاف، إضافة إلى المواقع الإلكترونية والحلول الرقمية وواجهات المستخدم وتطبيقات الهاتف. يمكنك فتح شاشة «خدماتنا» للتفاصيل.',en:'We offer logo and brand identity design, graphic design, wedding invitations, websites, digital solutions, user interfaces and mobile apps. Open the Services screen for details.'},
contact:{ar:'يمكنك مراسلتنا عبر واتساب على الرقم +971 52 598 7033 أو البريد Abdulkaderbinshy@gmail.com. يسعدنا التواصل معك.',en:'Reach us on WhatsApp at +971 52 598 7033 or email Abdulkaderbinshy@gmail.com. We look forward to hearing from you.'},
location:{ar:'مقر SOULARAB TECH في حلب، سوريا، مع خدمات ومتابعة من الإمارات العربية المتحدة، ونخدم عملاءنا حول العالم عن بُعد.',en:'SOULARAB TECH is based in Aleppo, Syria, with operations and follow-up in the United Arab Emirates, serving clients worldwide remotely.'},
process:{ar:'نبدأ بفهم احتياجك، ثم نتفق على التفاصيل والمدة والتكلفة، وبعدها ننفذ العمل ونسلم الملفات بالصيغ المتفق عليها.',en:'We understand your needs, agree on scope, timeline and price, then create and deliver the agreed files.'},
owner:{ar:'مدير SOULARAB TECH هو عبدالقادر. يسعدنا استقبال استفساراتك الرسمية عبر قنوات التواصل المعروضة في الموقع.',en:'SOULARAB TECH is managed by Abdulkader. Please use the contact channels shown on the website for formal inquiries.'}
};
function addMessage(text,cls){const p=document.createElement('p');p.className=cls;p.textContent=text;$('#chatBody').append(p);$('#chatBody').scrollTop=$('#chatBody').scrollHeight}
function answerQuestion(q){const text=answers[q]?.[language]||(language==='ar'?'أهلاً بك، أنا روح AI، السكرتيرة الرقمية لـ SOULARAB TECH. يمكنني مساعدتك في معلومات الخدمات والتواصل وموقع الشركة. وللاستفسارات الخاصة، يسعد الأستاذ عبدالقادر باستقبال رسالتك عبر قنوات التواصل الرسمية.':'Welcome, I am Rooh AI, SOULARAB TECH’s digital secretary. I can help with services, contact details and location. For specific inquiries, Abdulkader welcomes your message through our official contact channels.');addMessage(text,'bot-message')}
$$('[data-question]').forEach(b=>b.addEventListener('click',()=>{addMessage(b.textContent,'user-message');answerQuestion(b.dataset.question)}));
$('#chatForm').addEventListener('submit',e=>{e.preventDefault();const input=$('#chatInput'),q=input.value.trim();if(!q)return;addMessage(q,'user-message');input.value='';const normalized=q.toLowerCase();let key=normalized.match(/مدير|عبدالقادر|مسؤول|owner|manager|founder/)?'owner':normalized.match(/خدم|service|تصميم|design/)?'services':normalized.match(/تواصل|واتساب|بريد|contact|email|whatsapp/)?'contact':normalized.match(/أين|وين|مقر|location|based/)?'location':normalized.match(/كيف.*عمل|طريقة|process/)?'process':null;answerQuestion(key)});
$('#orderForm').addEventListener('submit',e=>{e.preventDefault();const name=$('#orderName').value.trim(),service=$('#orderService').selectedOptions[0].textContent.trim(),details=$('#orderDetails').value.trim();const msg=language==='ar'?['طلب خدمة جديد من SOULARAB TECH','الاسم: '+name,'الخدمة: '+service,'تفاصيل المشروع: '+details].join('\n'):['New service request from SOULARAB TECH','Name: '+name,'Service: '+service,'Project details: '+details].join('\n');window.open('https://wa.me/971525987033?text='+encodeURIComponent(msg),'_blank','noopener,noreferrer')});
$('#year').textContent=new Date().getFullYear();
setInterval(()=>{const b=$('#roohLaunch');if(!b.hidden&&rooh.hidden){b.classList.remove('wave');void b.offsetWidth;b.classList.add('wave')}},600000);
})();