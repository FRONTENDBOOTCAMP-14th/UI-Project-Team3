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

loadHTML('#header', '../components/common/header.html');
loadHTML('#navbar', '../components/common/navbar.html', headerFunction);
loadHTML('#footer', '../components/common/footer.html', accrodionFunction);
