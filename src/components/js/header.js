'use strict';

export function headerFunction() {
  const openBtn = document.querySelector('.menu-open');
  const sideMenu = document.querySelector('.aside-menu');
  const overlay = document.querySelector('.overlay');
  const closeBtn = document.querySelector('.close-button');

  if (!openBtn || !sideMenu || !overlay || !closeBtn) return;

  openBtn.addEventListener('click', () => {
    sideMenu.classList.add('active');
    overlay.classList.add('active');
  });

  const colseMenu = () => {
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
  };

  closeBtn.addEventListener('click', colseMenu);
  overlay.addEventListener('click', colseMenu);
}
