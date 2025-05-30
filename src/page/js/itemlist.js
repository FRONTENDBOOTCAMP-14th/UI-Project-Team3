'use strict';

const rangeBtn = document.querySelector('.range-button');
const filterSublists = document.querySelector('.filter-sublists');
const arrowBtn = document.querySelector('.range-button-icon');
const filterWrapper = document.querySelector('.itemlist-filter-wrapper');
const mbFilterBtn = document.querySelector('.mb-filter-btn');
const mbCloseFilterBtn = document.querySelector('.mb-filter-close-button');

let releaseFocus = null;

// Tab가능한 모든 요소 가져오기
function trapFocus(container) {
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

  // 포커스를 첫 번째 요소로 이동
  firstEl?.focus();

  return () => container.removeEventListener('keydown', handleTab);
}

// 태블릿크기 이상시 초기화
window.addEventListener('resize', () => {
  if (window.innerWidth > 1024) {
    filterSublists.classList.remove('active');
    filterWrapper.classList.add('hidden');
    document.body.classList.remove('scrollhidden');
    arrowBtn.style.transform = 'rotate(0deg)';
  }
});

// 정렬기준 클릭시 서브아이템 보여주기
rangeBtn.addEventListener('click', () => {
  filterSublists.classList.toggle('active');

  const isRotated = arrowBtn.style.transform === 'rotate(180deg)';
  arrowBtn.style.transform = isRotated ? 'rotate(0deg)' : 'rotate(180deg)';
  arrowBtn.style.transition = 'transform 0.3s ease';
});

// 모바일 필터 버튼 클릭 관련
mbFilterBtn.addEventListener('click', () => {
  filterWrapper.classList.remove('hidden');
  // 리플로우 -> transition 준비
  void filterWrapper.offsetWidth;
  filterWrapper.classList.add('active');
  document.body.classList.add('scrollhidden');

  function onTransitionEnd() {
    releaseFocus = trapFocus(filterWrapper);
    filterWrapper.removeEventListener('transitionend', onTransitionEnd);
  }

  filterWrapper.addEventListener('transitionend', onTransitionEnd);
});

// 필터창 닫기 함수
const filterClosed = () => {
  filterWrapper.classList.remove('active');
  setTimeout(() => {
    filterWrapper.classList.add('hidden');
  }, 300); //duration과 시간이 같아야 적용
  document.body.classList.remove('scrollhidden');
};

mbCloseFilterBtn.addEventListener('click', () => {
  filterClosed();
  releaseFocus?.();
  mbFilterBtn.focus();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    filterClosed();
  }
});
