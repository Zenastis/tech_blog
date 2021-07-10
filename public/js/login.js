const loginHandler = async function(event) {
    event.preventDefault();

    const usernameElement = document.querySelector("#username-input-login");
    const passwordElement = document.querySelector("#password-input-login");
    const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            username: usernameElement.value,
            password: passwordElement.value,
        }),
        headers: {"Content-Type": "application/json"},
    });
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert ("login failed");
    }
};

document
.querySelector("#login-form")
.addEventListener("submit", loginHandler);