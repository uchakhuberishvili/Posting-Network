const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const postForm = document.getElementById('post-form');
const logoutButton = document.getElementById('logout-button');
const authMessage = document.getElementById('auth-message');
const publicPostsSection = document.getElementById('public-posts');
const privatePostsSection = document.getElementById('private-posts');
let users = JSON.parse(localStorage.getItem('users')) || [];
let posts = JSON.parse(localStorage.getItem('posts')) || [];

function clearForms() {
    registerForm.reset();
    loginForm.reset();
    postForm.reset();
    registerForm.style.display = 'none';
    loginForm.style.display = 'none';
}

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    if (users.some((user) => user.username === username)) {
        authMessage.textContent = 'Username already taken ჩემო ძმაო';
        return;
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    authMessage.textContent = 'Registration successful ჩემო ძმაო';

});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
        logoutButton.style.display = 'block';
        postForm.style.display = 'block';
        authMessage.textContent = 'Login successful ჩემო ძმაო';
        clearForms();
        loadPosts();
    } else {
        authMessage.textContent = 'Invalid username or password ჩემო ძმაო';
    }
});

postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('post-title').value;
    const body = document.getElementById('post-body').value;
    const isPrivate = document.getElementById('post-private').checked;
    posts.push({ title, body, author: 'current user', isPrivate });
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
    clearForms();
});

logoutButton.addEventListener('click', () => {
    logoutButton.style.display = 'none';
    postForm.style.display = 'none';
    registerForm.style.display = 'block';
    loginForm.style.display = 'block';
    authMessage.textContent = '';
    publicPostsSection.innerHTML = '<h2>Public Posts:</h2>';
    privatePostsSection.innerHTML = '<h2>Private Posts:</h2>';
});

function loadPosts() {
    publicPostsSection.innerHTML = '<h2>Public Posts:</h2>';
    privatePostsSection.innerHTML = '<h2>Private Posts:</h2>';
    posts.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <p>Author: ${post.author}</p>
        `;
        if (post.isPrivate) {
            privatePostsSection.appendChild(postElement);
        } else {
            publicPostsSection.appendChild(postElement);
        }
    });
}