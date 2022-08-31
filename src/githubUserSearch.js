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

const getAPI = async (username) => {
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
  const subBlockWorkData = document.querySelectorAll('.user-sub-block__work__data');
  const subBlockWork = document.querySelectorAll('.user-sub-block__work');

  const array = [
    { id: 0, content: data.location },
    { id: 1, content: data.blog },
    { id: 2, content: data.twitter_username },
    { id: 3, content: data.company },
  ];

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

  subBlockWorkData.forEach((element) => {
    element.remove();
  });

  [...subBlockWork].map((item, index) => {
    const result = array.filter((it) => it.id === index);
    result.map((element, index) => {
      if (element.content === null || element.content === undefined || element.content === '') {
        item.classList.add('inactive');
        const p = document.createElement('p');
        p.textContent = 'Not Available';
        p.classList.add('user-sub-block__work__data', 'inactive');
        item.appendChild(p);
      } else if (element.id === 0 && element.content !== null) {
        item.classList.remove('inactive');
        const p = document.createElement('p');
        p.textContent = element.content;
        p.classList.add('user-sub-block__work__data');
        item.appendChild(p);
      } else {
        item.classList.remove('inactive');
        const a = document.createElement('a');
        a.classList.add('user-sub-block__work__data');
        item.appendChild(a);
        if (element.id === 1) {
          a.textContent = element.content;
          a.href = element.content;
        } else if (element.id === 2) {
          a.textContent = element.content;
          a.href = `https://twitter.com/${element.content}`;
        } else if (element.id === 3) {
          const company = data.company.substring(1);
          a.textContent = element.content;
          a.href = `https://github.com/${company}`;
        }
      }
    });
  });

  input.value = '';
};
