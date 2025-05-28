'use strict';

export function footerFunction() {
  const accordionBtns = document.querySelectorAll('.btn-arrow');

  accordionBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (window.innerWidth > 640) return;

      e.preventDefault();

      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isExpanded));

      const subMenu = btn.closest('li').querySelector('.footer-sub-menu');
      if (subMenu) {
        subMenu.style.display = isExpanded ? 'none' : 'block';
      }
    });
  });

  // 화면 크기 바뀔 때 상태 초기화
  window.addEventListener('resize', () => {
    if (window.innerWidth > 640) {
      accordionBtns.forEach((btn) => {
        btn.setAttribute('aria-expanded', 'true');

        const subMenu = btn.closest('li').querySelector('.footer-sub-menu');
        if (subMenu) {
          subMenu.style.display = 'block';
        }
      });
    } else {
      accordionBtns.forEach((btn) => {
        btn.setAttribute('aria-expanded', 'false');

        const subMenu = btn.closest('li').querySelector('.footer-sub-menu');
        if (subMenu) {
          subMenu.style.display = 'none';
        }
      });
    }
  });
}
