'use strict';

import { keyFocus } from '../../components/common/js/header.js';

const rangeBtn = document.querySelector('.range-button');
const filterSublists = document.querySelector('.filter-sublists');
const arrowBtn = document.querySelector('.range-button-icon');
const filterWrapper = document.querySelector('.itemlist-filter-wrapper');
const mbFilterBtn = document.querySelector('.mb-filter-btn');
const mbCloseFilterBtn = document.querySelector('.mb-filter-close-button');
const deskFilterBtn = document.querySelector('.desk-filter-button');
const buttonText = document.querySelector('.filter-button-text');
let releaseFocus = null;

// 태블릿크기 이상시 초기화
let wasMobile = window.innerWidth < 1024;

window.addEventListener('resize', () => {
  const isMobile = window.innerWidth < 1024;

  if (wasMobile === isMobile) return;
  wasMobile = isMobile;

  if (!isMobile) {
    // 모바일 필터 상태만 초기화
    filterSublists.classList.remove('active');
    arrowBtn.style.transform = 'rotate(0deg)';
    document.body.classList.remove('scrollhidden');

    // 만약 모바일에서 열렸던 필터가 있다면 초기화
    if (filterWrapper.classList.contains('active') && !filterWrapper.classList.contains('hidden')) {
      filterWrapper.classList.remove('active');
      filterWrapper.classList.add('hidden');
      document.body.classList.remove('scrollhidden');
      // 버튼 텍스트 초기화
      buttonText.textContent = '필터 열기';
    }
  } else {
    filterWrapper.classList.add('hidden');
    filterWrapper.classList.remove('active');
    // 버튼 텍스트 초기화
    buttonText.textContent = '필터 열기';
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
    releaseFocus = keyFocus(filterWrapper);
    filterWrapper.removeEventListener('transitionend', onTransitionEnd);
  }

  filterWrapper.addEventListener('transitionend', onTransitionEnd);
});

// 데스크탑 필터 버튼 클릭
deskFilterBtn.addEventListener('click', () => {
  const isToggle = filterWrapper.classList.toggle('hidden');

  buttonText.textContent = isToggle ? '필터 열기' : '필터 숨기기';
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
