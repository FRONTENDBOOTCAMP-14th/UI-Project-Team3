'use strict';

// Tab가능한 모든 요소 가져오기
export function keyFocus(container) {
  const focusableElements = container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])');
  const firstEl = focusableElements[0];
  const lastEl = focusableElements[focusableElements.length - 1];

  function handleTab(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  }

  container.addEventListener('keydown', handleTab);

  // 포커스 제한 해제를 위한 함수 반환
  return () => {
    container.removeEventListener('keydown', handleTab);
  };
}

export function headerFunction() {
  const openBtn = document.querySelector('.menu-open');
  const sideMenu = document.querySelector('.aside-menu');
  const subMenuToggles = document.querySelectorAll('.sub-menu-toggle');
  const overlay = document.querySelector('.overlay');
  const closeBtn = document.querySelector('.close-button');
  const navbar = document.getElementById('navbar');
  const sideFilterMenu = document.querySelector('.itemlist-filter-wrapper');
  let removeFocusTrap = null;

  if (!openBtn || !sideMenu || !overlay || !closeBtn || !navbar) return;

  // 메뉴 열기
  openBtn.addEventListener('click', () => {
    sideMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('scrollhidden');
    navbar.classList.add('overflow');

    removeFocusTrap = keyFocus(sideMenu);
    const firstFocusable = sideMenu.querySelector('a, button, input, [tabindex]:not([tabindex="-1"])');
    firstFocusable?.focus();
  });

  // 메뉴 닫기
  const closeMenu = () => {
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('scrollhidden');
    navbar.classList.remove('overflow');

    // 포커스 트랩 해제
    if (removeFocusTrap) {
      removeFocusTrap();
      removeFocusTrap = null;
    }

    closeAllSubmenus();
  };

  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // 서브메뉴 전부 닫기
  const closeAllSubmenus = () => {
    subMenuToggles.forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');

      const submenu = btn.parentElement.querySelector('.sub-menu-list');
      const arrow = btn.querySelector('.arrow-icon');

      if (submenu) {
        submenu.classList.remove('dropdown');
        submenu.hidden = true;
      }
      if (arrow) arrow.classList.remove('rotate');
    });
  };

  // 서브메뉴 토글
  const toggleDropdown = (btn) => {
    const submenu = btn.parentElement.querySelector('.sub-menu-list');
    const arrow = btn.querySelector('.arrow-icon');

    if (!submenu) return;

    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));

    if (isOpen) {
      submenu.classList.remove('dropdown');
      arrow?.classList.remove('rotate');
      setTimeout(() => {
        submenu.hidden = true;
      }, 300);
    } else {
      submenu.hidden = false;
      requestAnimationFrame(() => {
        submenu.classList.add('dropdown');
        arrow?.classList.add('rotate');
      });
    }
  };

  // 스크롤 시 상단 네브바 숨기기
  const handleScrollHideNavbar = (event) => {
    if (sideMenu.classList.contains('active')) {
      return; // 사이드 메뉴 열리면 무시
    }

    if (event.shiftKey) return;

    // 사이드 필터바, 사이드 메뉴 스크롤 시 무시
    const isInsideFilter = sideFilterMenu?.contains(event.target);
    const isInsideAside = sideMenu?.classList.contains('active') && sideMenu.contains(event.target);
    if (isInsideFilter || isInsideAside) return;

    if (event.deltaY > 0) {
      navbar.classList.add('hidden');
      navbar.classList.remove('show');
    } else if (event.deltaY < 0) {
      navbar.classList.remove('hidden');
      navbar.classList.add('show');
    }
  };

  // 윈도우 리사이즈 대응
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });

  window.addEventListener('wheel', handleScrollHideNavbar);

  // 서브메뉴 버튼 클릭 이벤트
  subMenuToggles.forEach((btn) => {
    btn.addEventListener('click', () => toggleDropdown(btn));
  });
}
