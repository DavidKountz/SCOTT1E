localStorage.setItem('isLoggedIn', 'false');
function attemptLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var adminUsername = "admin";
    var adminPassword = "admin123";

    // Check if the entered credentials match
    if (username === adminUsername && password === adminPassword)
    {
        // Redirect to the admin dashboard
        localStorage.setItem('isLoggedIn','true');
        window.location.href = "../views/adminDash.html";
    } else {
        document.getElementById("loginMessage").textContent = "Invalid credentials. Please try again.";
    }
}

function logOut()
{
    localStorage.setItem('isLoggedIn','false');
    window.location.href = "../views/index.html";
}