document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");
    const loginUsername = document.getElementById("loginUsername");
    const loginPassword = document.getElementById("loginPassword");
    const loginError = document.getElementById("loginError");
    const loginOverlay = document.getElementById("loginOverlay");

    // Asegurar que el mensaje de error esté oculto al inicio
    loginError.style.display = "none";

    // Credenciales permitidas (modifica según sea necesario)
    const validUsername = "admin";
    const validPassword = "1234";

    function showError(message) {
        loginError.textContent = message;
        loginError.style.display = "block";  // Mostrar mensaje
        loginError.style.color = "red";      // Asegurar que sea visible
        loginError.style.fontWeight = "bold";
        loginError.style.textAlign = "center";
        loginError.style.marginTop = "10px"; // Separación del botón

        setTimeout(() => {
            loginError.style.display = "none"; // Ocultar después de 3 segundos
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
