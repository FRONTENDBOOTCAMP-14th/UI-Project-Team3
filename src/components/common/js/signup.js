// 비밀번호 유효성 검사
const passwordInput = document.getElementById('password');
const lengthCheck = document.getElementById('length-check');
const complexityCheck = document.getElementById('complexity-check');

passwordInput.addEventListener('input', () => {
  const value = passwordInput.value;

  // 조건 1: 최소 8자
  const isLongEnough = value.length >= 8;
  toggleValidation(lengthCheck, isLongEnough);

  // 조건 2: 대/소문자 포함 + 숫자 포함
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const isComplex = hasUpper && hasLower && hasNumber;
  toggleValidation(complexityCheck, isComplex);
});

function toggleValidation(element, isValid) {
  const icon = element.querySelector('.icon');
  if (isValid) {
    element.classList.remove('invalid');
    element.classList.add('valid');
    icon.textContent = '✔';
  } else {
    element.classList.remove('valid');
    element.classList.add('invalid');
    icon.textContent = '✕';
  }
}

// 화면 전환 관련
const signupScreen = document.getElementById('signup-screen');
const termsScreen = document.getElementById('terms-screen');
const createAccountBtn = document.getElementById('create-account-btn');
const continueBtn = document.getElementById('continue-btn');
const cancelBtn = document.getElementById('cancel-btn');
const allAgreeCheckbox = document.getElementById('all-agree');
const requiredCheckboxes = document.querySelectorAll('.required-checkbox');
const signupForm = document.getElementById('signup-form');

// 계정 만들기 버튼 클릭 시 약관 화면으로 전환
createAccountBtn.addEventListener('click', (e) => {
  e.preventDefault();

  // 기본 폼 유효성 검사
  const formData = new FormData(signupForm);
  const firstName = formData.get('first-name');
  const lastName = formData.get('last-name');
  const password = formData.get('password');
  const birth = formData.get('birth');
  const basicTerms = document.getElementById('basic-terms').checked;

  if (!firstName || !lastName || !password || !birth || !basicTerms) {
    alert('모든 필수 항목을 입력해주세요.');
    return;
  }

  // 생년월일 8자리 체크
  if (birth.length !== 8) {
    alert('생년월일을 8자리로 입력해주세요. (예: 20001231)');
    return;
  }

  // 비밀번호 유효성 검사
  const isLongEnough = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isComplex = hasUpper && hasLower && hasNumber;

  if (!isLongEnough || !isComplex) {
    alert('비밀번호 조건을 만족해주세요.');
    return;
  }

  // 화면 전환 - 첫 번째 화면 숨기고 두 번째 화면 표시
  signupScreen.classList.add('hidden');
  termsScreen.classList.add('show');

  // 페이지 맨 위로 스크롤
  window.scrollTo(0, 0);
});

// 모든 약관 동의 체크박스
allAgreeCheckbox.addEventListener('change', () => {
  const isChecked = allAgreeCheckbox.checked;
  requiredCheckboxes.forEach((checkbox) => {
    checkbox.checked = isChecked;
  });
  updateContinueButton();
});

// 개별 체크박스 변경 시
document.querySelectorAll('.required-checkbox').forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    updateContinueButton();
    updateAllAgreeCheckbox();
  });
});

function updateContinueButton() {
  const allRequiredChecked = Array.from(requiredCheckboxes).every((checkbox) => checkbox.checked);
  continueBtn.disabled = !allRequiredChecked;
}

function updateAllAgreeCheckbox() {
  const allChecked = Array.from(requiredCheckboxes).every((checkbox) => checkbox.checked);
  allAgreeCheckbox.checked = allChecked;
}

// 취소 버튼 - 첫 번째 화면으로 돌아가기
cancelBtn.addEventListener('click', () => {
  // 화면 전환
  termsScreen.classList.remove('show');
  signupScreen.classList.remove('hidden');

  // 약관 체크박스 모두 초기화
  document.querySelectorAll('#terms-screen input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = false;
  });
  continueBtn.disabled = true;

  // 페이지 맨 위로 스크롤
  window.scrollTo(0, 0);
});

// 계속 버튼 - 회원가입 완료
continueBtn.addEventListener('click', () => {
  alert('회원가입이 완료되었습니다!');
  // 실제로는 서버로 데이터 전송 후 다음 페이지로 이동
});

// 생년월일 입력 제한 (숫자만)
document.getElementById('birth').addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
});
