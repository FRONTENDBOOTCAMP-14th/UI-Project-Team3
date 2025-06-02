'use strict';

export function accrodionFunction() {
  const accordionBtns = document.querySelectorAll('.btn-accrodion');
  const openStates = new Map(); // 버튼별 열림 상태 기억

  function toggleAccordion(btn) {
    const subMenu = btn.parentElement.querySelector('.detail-accrodion');
    if (!subMenu) return;

    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    const shouldExpand = !isExpanded;

    btn.setAttribute('aria-expanded', String(shouldExpand));
    subMenu.style.display = shouldExpand ? 'block' : 'none';

    openStates.set(btn, shouldExpand);
  }

  function resetAccordions() {
    accordionBtns.forEach((btn) => {
      const subMenu = btn.parentElement.querySelector('.detail-accrodion');
      if (!subMenu) return;

      const isOpen = openStates.get(btn);

      if (typeof isOpen === 'boolean') {
        btn.setAttribute('aria-expanded', String(isOpen));
        subMenu.style.display = isOpen ? 'block' : 'none';
        return;
      }

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
    openStates.set(btn, false); // 초기에는 모두 닫힘

    btn.addEventListener('click', (e) => {
      const isMoOnly = btn.classList.contains('mo-block');

      if (isMoOnly && window.innerWidth >= 640) return;

      e.preventDefault();
      toggleAccordion(btn);
    });
  });

  // 초기 상태
  resetAccordions();

  // orientationchange나 focusout 이벤트는 사용 가능
  window.addEventListener('orientationchange', resetAccordions);
}
