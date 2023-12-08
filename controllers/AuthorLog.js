
const loginForm = document.getElementById('loginForm');



loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    if (usernameInput === user.userName && passwordInput === user.password) {

        console.log('Before redirection');
        window.location.href = '/views/profile.html'; // Use an absolute URL
        console.log('After redirection');


    } else {
        alert('Invalid username or password. Please try again.');
    }
});


