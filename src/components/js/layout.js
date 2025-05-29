import { headerFunction } from './header.js';
import { accrodionFunction } from './accrodion.js';

const loadHTML = async (selector, url, callback) => {
  await fetch(url)
    .then((res) => res.text())
    .then((html) => {
      document.querySelector(selector).innerHTML = html;
      if (callback) callback();
    });
};

loadHTML('#header', '../components/header.html', headerFunction);
loadHTML('#footer', '../components/footer.html', accrodionFunction);
