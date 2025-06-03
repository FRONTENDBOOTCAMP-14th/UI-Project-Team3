'use strict';

import './style.css';
import { keyFocus } from '../src/components/common/js/header.js';

const navLinks = document.querySelectorAll('.index-links');
const sections = document.querySelectorAll('.index-content-section');
const teamName = document.querySelector('.team-name');
const nav = document.querySelector('.index-navbar');
const sideNav = document.querySelector('.navbar-lists');
const openBtn = document.querySelector('.open-button');
const closeBtn = document.querySelector('.exit-button');
const idxOverlay = document.querySelector('.index-overlay');

let removeFocusTrap = null;

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
  });
});

openBtn.addEventListener('click', () => {
  sideNav.classList.toggle('active');
  closeBtn.classList.toggle('active');
  idxOverlay.classList.add('active');

  removeFocusTrap = keyFocus(sideNav);
  const firstFocusable = sideNav.querySelector('a, button, input, [tabindex]:not([tabindex="-1"])');
  firstFocusable?.focus();
});

closeBtn.addEventListener('click', () => {
  sideNav.classList.remove('active');
  closeBtn.classList.remove('active');
  idxOverlay.classList.remove('active');
});

idxOverlay.addEventListener('click', () => {
  sideNav.classList.remove('active');
  closeBtn.classList.remove('active');
  idxOverlay.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    sideNav.classList.remove('active');
    closeBtn.classList.remove('active');
    idxOverlay.classList.remove('active');
  }
});

// 페이지 진입 시 main 보이도록 설정
document.getElementById('index-main-section').classList.add('active');
// 일정 시간뒤 nav바 보이도록 설정
setTimeout(() => {
  nav.classList.add('active');
  teamName.classList.add('active');
}, 2000);
