'use strict';

import './style.css';
import { keyFocus } from '../src/components/common/js/header.js';

const navLinks = document.querySelectorAll('.index-links');
const sections = document.querySelectorAll('.index-content-section');
const teamName = document.querySelector('.team-name');
const idxNav = document.querySelector('.index-navbar');
const sideNav = document.querySelector('.navbar-lists');
const openBtn = document.querySelector('.open-button');
const closeBtn = document.querySelector('.exit-button');
const idxOverlay = document.querySelector('.index-overlay');
const idxFooter = document.querySelector('.index-footer');
const idxContToggle = document.querySelectorAll('.accordion-button');

let removeFocusTrap = null;

const classRemove = () => {
  sideNav.classList.remove('active');
  closeBtn.classList.remove('active');
  idxOverlay.classList.remove('active');
  document.body.classList.remove('scrollhidden');
};

// 네브바 링크 클릭시 해당 컨텐츠 보이도록 설정
navLinks.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();

    const targetId = item.dataset.contents;
    // console.log(targetId);
    const targetSection = document.getElementById(targetId);
    // console.log(targetSection);

    sections.forEach((sec) => {
      if (sec === targetSection) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });

    classRemove();
    closeAllSubmenus();
  });
});

// Y축 스크롤이 Nav높이보다 커지면 배경색 주기
document.addEventListener('scroll', () => {
  if (window.scrollY > idxNav.getBoundingClientRect().height) {
    idxNav.style.backgroundColor = '#fff';
  } else {
    idxNav.style.backgroundColor = 'transparent';
  }
});

openBtn.addEventListener('click', () => {
  sideNav.classList.toggle('active');
  closeBtn.classList.toggle('active');
  idxOverlay.classList.add('active');
  document.body.classList.add('scrollhidden');

  removeFocusTrap = keyFocus(sideNav);
  const firstFocusable = sideNav.querySelector('a, button, input, [tabindex]:not([tabindex="-1"])');
  firstFocusable?.focus();
});

closeBtn.addEventListener('click', () => {
  classRemove();
});

idxOverlay.addEventListener('click', () => {
  classRemove();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    classRemove();
  }
});

// 프로젝트 규칙 아코디언 버튼
const toggleDropdown = (btn) => {
  const contents = btn.parentElement.querySelector('.content-wrapper');
  const arrow = btn.querySelector('.arrow-icon');

  if (!contents) return;

  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!isOpen));

  if (isOpen) {
    contents.classList.remove('dropdown');
    arrow?.classList.remove('rotate');
    contents.hidden = true;
  } else {
    contents.hidden = false;
    requestAnimationFrame(() => {
      contents.classList.add('dropdown');
      arrow?.classList.add('rotate');
    });
  }
};

idxContToggle.forEach((btn) => {
  btn.addEventListener('click', () => {
    toggleDropdown(btn);
  });
});

const closeAllSubmenus = () => {
  idxContToggle.forEach((btn) => {
    btn.setAttribute('aria-expanded', 'false');

    const submenu = btn.parentElement.querySelector('.content-wrapper');
    const arrow = btn.querySelector('.arrow-icon');

    if (submenu) {
      submenu.classList.remove('dropdown');
      submenu.hidden = true;
    }
    if (arrow) arrow.classList.remove('rotate');
  });
};

// 페이지 진입 시 main 보이도록 설정
document.getElementById('index-main-section').classList.add('active');
// 일정 시간뒤 nav바 보이도록 설정
setTimeout(() => {
  idxNav.classList.add('active');
  teamName.classList.add('active');
  idxFooter.classList.add('active');
}, 2000);
