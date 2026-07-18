

  lucide.createIcons();

  // header scroll state
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });

  // mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.innerHTML = navLinks.classList.contains('open')
      ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    lucide.createIcons();
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.innerHTML = '<i data-lucide="menu"></i>';
    lucide.createIcons();
  }));

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  // roadmap line draw + module nodes
  const roadmapPath = document.querySelector('.roadmap-svg path.drawn');
  const roadmapBody = document.getElementById('roadmapBody');
  const roadmapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) roadmapPath.classList.add('on');
    });
  }, { threshold: 0.05 });
  roadmapObserver.observe(roadmapBody);

  const modules = document.querySelectorAll('.module');
  const moduleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
      }
    });
  }, { threshold: 0.4 });
  modules.forEach(m => moduleObserver.observe(m));

  // testimonial modal
  const overlay = document.getElementById('modalOverlay');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.t-item').forEach(item => {
    item.addEventListener('click', () => {
      modalImg.src = item.getAttribute('data-full');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

document.addEventListener('DOMContentLoaded', function() {
    // 1. Look for an Affiliate ID in the web address
    var urlParams = new URLSearchParams(window.location.search);
    var affiliate_id = urlParams.get('a');

    // 2. If an Affiliate ID exists, attach it to all EarnersPay checkout buttons
    if (affiliate_id) {
        // Find every link on the page that goes to EarnersPay
        var checkoutLinks = document.querySelectorAll('a[href*="app.earnerspay.com/checkout"]');
        
        checkoutLinks.forEach(function(link) {
            var currentUrl = link.getAttribute('href');
            // Safely glue the affiliate ID to the end of the vendor's link
            link.setAttribute('href', currentUrl + '&a=' + encodeURIComponent(affiliate_id));
        });
    }
});

