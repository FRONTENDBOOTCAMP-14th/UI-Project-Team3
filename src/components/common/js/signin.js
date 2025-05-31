const continueBtn = document.getElementById('continue-btn');
const emailInput = document.getElementById('email');
const emailSection = document.getElementById('email-section');
const passwordSection = document.getElementById('password-section');
const emailDisplay = document.getElementById('email-display');
const backBtn = document.getElementById('back-btn');
const passwordForm = document.getElementById('password-form');

continueBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  if (!email.includes('@')) {
    alert('올바른 이메일 형식을 입력하세요.');
    return;
  }

  emailDisplay.textContent = email;
  emailSection.style.display = 'none';
  passwordSection.style.display = 'block';
});

backBtn.addEventListener('click', () => {
  passwordSection.style.display = 'none';
  emailSection.style.display = 'block';
});

passwordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('로그인 처리 예정입니다.');
});