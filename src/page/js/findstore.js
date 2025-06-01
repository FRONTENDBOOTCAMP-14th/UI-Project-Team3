'use strict';

const mapBtn = document.querySelector('.button-map');
const listBtn = document.querySelector('.button-list');
const mapWrapper = document.querySelector('.map-wrapper');
const listWrapper = document.querySelector('.list-wrapper');

mapBtn.addEventListener('click', () => {
  mapWrapper.classList.add('active');
  listWrapper.classList.remove('active');

  mapBtn.classList.add('active');
  listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
  listWrapper.classList.add('active');
  mapWrapper.classList.remove('active');

  listBtn.classList.add('active');
  mapBtn.classList.remove('active');
});
