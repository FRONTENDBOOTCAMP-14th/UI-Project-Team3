'use strict';

const openBtn = document.querySelector('.menu-open');
const sideMenu = document.querySelector('.aside-menu');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-button');

openBtn.addEventListener('click', () => {
  sideMenu.classList.add('active');
  overlay.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  sideMenu.classList.remove('active');
  overlay.classList.remove('active');
});
