(() => {
  const languageButton = document.getElementById('languageBtn');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const contactForm = document.getElementById('contactForm');
  const whatsappNumber = '971525987033';

  function setLanguage(language) {
    const lang = language === 'en' ? 'en' : 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-ar][data-en]').forEach((element) => {
      const value = element.dataset[lang];
      if (value !== undefined) element.textContent = value;
    });
    document.querySelectorAll('[data-placeholder-ar][data-placeholder-en]').forEach((element) => {
      element.placeholder = element.dataset[lang === 'ar' ? 'placeholderAr' : 'placeholderEn'];
    });
    if (languageButton) languageButton.textContent = lang === 'ar' ? 'English' : 'العربية';
    if (menuToggle) menuToggle.setAttribute('aria-label', lang === 'ar' ? 'فتح القائمة' : 'Open menu');
    try { localStorage.setItem('soularab-language', lang); } catch (_) {}
  }

  let savedLanguage = 'ar';
  try { savedLanguage = localStorage.getItem('soularab-language') || 'ar'; } catch (_) {}
  setLanguage(savedLanguage);

  languageButton?.addEventListener('click', () => {
    setLanguage(document.documentElement.lang === 'ar' ? 'en' : 'ar');
  });

  menuToggle?.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? '×' : '☰';
  });

  mainNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      if (menuToggle) menuToggle.textContent = '☰';
    });
  });

  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const lang = document.documentElement.lang;
    const name = document.getElementById('clientName').value.trim();
    const email = document.getElementById('clientEmail').value.trim();
    const service = document.getElementById('serviceType').selectedOptions[0].textContent.trim();
    const details = document.getElementById('projectDetails').value.trim();
    const message = lang === 'ar'
      ? 'طلب جديد من موقع SOULARAB TECH%0Aالاسم: ' + name + '%0Aالبريد الإلكتروني: ' + email + '%0Aالخدمة: ' + service + '%0Aتفاصيل المشروع: ' + details
      : 'New inquiry from SOULARAB TECH website%0AName: ' + name + '%0AEmail: ' + email + '%0AService: ' + service + '%0AProject details: ' + details;
    const url = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(message.replaceAll('%0A', '\n'));
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();