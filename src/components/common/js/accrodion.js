'use strict';

export function accrodionFunction() {
  console.log('Accordion function 실행됨!');
  const accordionBtns = document.querySelectorAll('.btn-accrodion');

  function toggleAccordion(btn) {
    const subMenu = btn.parentElement.querySelector('.detail-accrodion');
    if (!subMenu) return;

    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isExpanded));
    subMenu.style.display = isExpanded ? 'none' : 'block';
  }

  function resetAccordions() {
    accordionBtns.forEach((btn) => {
      const subMenu = btn.parentElement.querySelector('.detail-accrodion');
      if (!subMenu) return;

      if (btn.classList.contains('mo-block')) {
        if (window.innerWidth >= 640) {
          btn.removeAttribute('aria-expanded');
          subMenu.style.display = '';
        } else {
          btn.setAttribute('aria-expanded', 'false');
          subMenu.style.display = 'none';
        }
      } else {
        btn.setAttribute('aria-expanded', 'false');
        subMenu.style.display = 'none';
      }
    });
  }

  accordionBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const isMoOnly = btn.classList.contains('mo-block');

      if (isMoOnly && window.innerWidth >= 640) return;

      e.preventDefault();
      toggleAccordion(btn);
    });
  });

  // 초기 상태 설정
  resetAccordions();

  // 창 크기 변경 시 초기화
  window.addEventListener('resize', resetAccordions);
}
