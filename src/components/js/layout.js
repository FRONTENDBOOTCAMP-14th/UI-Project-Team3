import { headerFunction } from './header.js';

const loadHTML = async (selector, url, callback) => {
  await fetch(url)
    .then((res) => res.text())
    .then((html) => {
      document.querySelector(selector).innerHTML = html;
      if (callback) callback();
    });
};

loadHTML('#header', '../components/header.html');
loadHTML('#navbar', '../components/navbar.html', headerFunction);
loadHTML('#footer', './footer.html');
