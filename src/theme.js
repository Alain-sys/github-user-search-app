const themeButton = document.querySelector('.theme-button');
const themeButtonText = document.querySelector('.theme-button__text');
const themeButtonIconSun = document.querySelector('.theme-button__icon-sun');
const themeButtonIconMoon = document.querySelector('.theme-button__icon-moon');
const formSearch = document.querySelector('.form');
const user = document.querySelector('.user');
const userSubBlockIcons = document.querySelectorAll('.user-sub-block__icons-default');

themeButton.addEventListener('click', () => {
  themeButton.classList.toggle('default');

  if (themeButton.classList.contains('default')) {
    themeButtonIconSun.classList.add('active');
    themeButtonIconMoon.classList.remove('active');
    themeButtonText.textContent = 'light';

    formSearch.style.boxShadow = 'none';
    user.style.boxShadow = 'none';

    userSubBlockIcons.forEach((elem) => {
      elem.classList.add('user-sub-block__icons-default');
    });

    document.documentElement.style.setProperty('--bg-default', 'hsla(220, 40%, 13%, 1)');
    document.documentElement.style.setProperty('--bg-default-main', 'hsla(222, 41%, 20%, 1)');
    document.documentElement.style.setProperty('--clr-default-text', 'hsla(0, 0%, 100%, 1)');
    document.documentElement.style.setProperty('--clr-default-text-bold', 'hsla(0, 0%, 100%, 1)');
    document.documentElement.style.setProperty('--clr-default-theme-button', 'hsla(0, 0%, 100%, 1)');
    document.documentElement.style.setProperty('--clr-default-theme-button-hover', 'hsla(222, 44%, 70%, 1)');
    document.documentElement.style.setProperty('--clr-default-user-created', 'hsla(0, 0%, 100%, 1)');
    document.documentElement.style.setProperty(' --clr-default-icon', 'hsla(0, 0%, 100%, 1)');
  } else {
    themeButtonIconSun.classList.remove('active');
    themeButtonIconMoon.classList.add('active');
    themeButtonText.textContent = 'dark';

    formSearch.style.boxShadow = '0px 16px 30px -10px rgba(70, 96, 187, 0.198567)';
    user.style.boxShadow = '0px 16px 30px -10px rgba(70, 96, 187, 0.198567)';

    userSubBlockIcons.forEach((elem) => {
      elem.classList.remove('user-sub-block__icons-default');
    });

    document.documentElement.style.setProperty('--bg-default', 'hsla(226, 100%, 98%, 1)');
    document.documentElement.style.setProperty('--bg-default-main', 'hsla(0, 0%, 100%, 1)');
    document.documentElement.style.setProperty('--clr-default-text', 'hsla(217, 35%, 45%, 1)');
    document.documentElement.style.setProperty('--clr-default-text-bold', 'hsla(220, 18%, 16%, 1)');
    document.documentElement.style.setProperty('--clr-default-theme-button', 'hsla(217, 20%, 51%, 1)');
    document.documentElement.style.setProperty('--clr-default-theme-button-hover', 'hsla(220, 18%, 16%, 1)');
    document.documentElement.style.setProperty('--clr-default-user-created', 'hsla(217, 20%, 51%, 1)');
    document.documentElement.style.setProperty(' --clr-default-icon', 'hsla(217, 35%, 45%, 1)');
  }
});
