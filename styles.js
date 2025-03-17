document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");
    const loginUsername = document.getElementById("loginUsername");
    const loginPassword = document.getElementById("loginPassword");
    const loginError = document.getElementById("loginError");
    const loginOverlay = document.getElementById("loginOverlay");

    // Credenciales permitidas (modifica según sea necesario)
    const validUsername = "admin";
    const validPassword = "1234";

    function showError(message) {
        loginError.textContent = message;
        loginError.classList.add("show");
        setTimeout(() => {
            loginError.classList.remove("show");
        }, 3000);
    }

    function checkLogin() {
        const username = loginUsername.value.trim();
        const password = loginPassword.value.trim();

        if (!username || !password) {
            showError("Por favor, complete ambos campos.");
            return;
        }

        if (username === validUsername && password === validPassword) {
            // Login exitoso: Ocultar el overlay
            loginOverlay.style.display = "none";

            // Si el login está en un iframe, notificamos al documento principal
            if (window.parent !== window) {
                window.parent.postMessage("loginSuccess", "*");
            }
        } else {
            showError("Usuario o contraseña incorrectos, intente de nuevo.");
        }
    }

    loginButton.addEventListener("click", checkLogin);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkLogin();
        }
    });
});
