// THE LOADER

function removeLoader() {
  var preloadContainer = document.querySelector(".loader");
  setTimeout(function () {
    preloadContainer.style.opacity = 0;
    preloadContainer.style.visibility = "hidden";
  }, 800);
}

removeLoader();


// GETTING THE USERS

var usersContainer = document.querySelector("#users");
var errorContainer = document.querySelector("#error");

function userCard(usersList) {
  usersContainer.innerHTML = `
    ${usersList
      .map(function (user) {
        return `
        <div class="user">
        <span class="user__icon"><i class="lnr lnr-user"></i></span>
            <div class="user__details">
                <span>${user.name}</span>
                <span>${user.email}</span>
            </div>
            <a href="posts.html?userId=${user.id}&&name=${user.name}" class="btn btn-primary">${user.name}'s Posts</a>
        </div>
        `;
      })
      .join(" ")}
    `;
}

function getUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => userCard(json))
    .catch(
      (e) =>
        (errorContainer.innerHTML =
          "<p>Error, please send the request again</p>")
    );
}

if (usersContainer) {
  getUsers();
}

// GETTING THE POSTS

var urlParams = new URLSearchParams(window.location.search);
var userId = urlParams.get("userId");
var userName = urlParams.get("name");
var postsContainer = document.querySelector("#posts");

function postCard(postsList) {
  postsContainer.innerHTML = `
      <a href="index.html" class="btn btn-link"> USERS </a>
  
      <h6 class="user-name">"${userName}" Posts</h6>
  
      ${postsList
        .map(function (post) {
          return `
          <div class="post">
              <h4 class="post__title">${post.title}</h4>
              <p class="post__body">${post.body}</p>
          </div>
          `;
        })
        .join(" ")}
      `;
}

function getPosts() {
  if (!userId) {
    errorContainer.innerHTML =
      "<p>Error, please send the request again</p>";
  }

  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => response.json())
    .then((json) => postCard(json))
    .catch(
      (e) =>
        (errorContainer.innerHTML =
          "<p>Error, please send the request again</p>")
    );
}

if (postsContainer) {
  getPosts();
}


