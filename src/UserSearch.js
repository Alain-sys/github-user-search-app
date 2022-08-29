const input = document.querySelector('.form__input');
const form = document.querySelector('.form');
const formError = document.querySelector('.form__error');
const userImage = document.querySelector('.user__image');
const userName = document.querySelector('.user__name');
const userLogin = document.querySelector('.user__login');
const userCreated = document.querySelector('.user__created');
const userBio = document.querySelector('.user__bio');

const userPublicRepos = document.querySelector('.user-sub-block__repos ');
const userFollowers = document.querySelector('.user-sub-block__followers');
const userFollowing = document.querySelector('.user-sub-block__following');

const userLocation = document.querySelector('.user-sub-block__work__location');
const userWebsite = document.querySelector('.user-sub-block__work__website');
const userTwitter = document.querySelector('.user-sub-block__work__twitter');
const userCompany = document.querySelector('.user-sub-block__work__company');

const locationBlock = document.querySelector('.location-sub-block');
const websiteBlock = document.querySelector('.website-sub-block');
const twitterBlock = document.querySelector('.twitter-sub-block');
const companyBlock = document.querySelector('.company-sub-block');

let getAPI = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (response.status !== 200) {
    formError.classList.add('active');
    throw new Error('cannot fetch data');
  }
  formError.classList.remove('active');
  let data = await response.json();
  return data;
};

getAPI('octocat')
  .then((data) => {
    dataUser(data);
  })

  .catch((err) => {
    console.log('rejected', err.message);
  });

form.addEventListener('submit', (e) => {
  e.preventDefault();

  getAPI(input.value)
    .then((data) => {
      dataUser(data);
    })

    .catch((err) => {
      console.log('rejected', err.message);
    });
});

const dataUser = (data) => {
  const dataDate = new Date(data.created_at);
  const date = dataDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  userImage.src = data.avatar_url;

  if (data.name !== null) {
    userName.textContent = data.name;
  } else {
    userName.textContent = data.login;
  }

  userLogin.textContent = `@${data.login}`;
  userLogin.href = data.html_url;
  userCreated.textContent = `Joined ${date}`;

  if (data.bio === null) {
    userBio.textContent = 'This profile has no bio';
    userBio.classList.add('inactive');
  } else {
    userBio.classList.remove('inactive');
    userBio.textContent = data.bio;
  }

  userPublicRepos.textContent = data.public_repos;
  userFollowers.textContent = data.followers;
  userFollowing.textContent = data.following;

  if (data.location !== null) {
    userLocation.textContent = data.location;
    locationBlock.classList.remove('inactive');
  } else {
    userLocation.textContent = 'Not Available';
    locationBlock.classList.add('inactive');
  }

  if (data.blog !== '') {
    userWebsite.textContent = data.blog;
    userWebsite.href = data.blog;
    websiteBlock.classList.remove('inactive');
  } else {
    userWebsite.textContent = 'Not Available';
    userWebsite.href = '#';
    websiteBlock.classList.add('inactive');
  }

  if (data.twitter_username !== null) {
    userTwitter.textContent = data.twitter_username;
    userTwitter.href = `https://twitter.com/${data.twitter_username}`;
    twitterBlock.classList.remove('inactive');
  } else {
    userTwitter.textContent = 'Not Available';
    userTwitter.href = '#';
    twitterBlock.classList.add('inactive');
  }

  if (data.company !== null) {
    const test = data.company.substring(1);
    userCompany.textContent = data.company;
    userCompany.href = `https://github.com/${test}`;
    companyBlock.classList.remove('inactive');
  } else {
    userCompany.textContent = 'Not Available';
    userCompany.href = '#';
    companyBlock.classList.add('inactive');
  }

  input.value = '';
};
