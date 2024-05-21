function toggleForm() {
    var loginForm = document.getElementById("loginForm");
    var signupForm = document.getElementById("signupForm");
    var toggleText = document.getElementById("toggleText");

    if (loginForm.classList.contains("active")) {
        loginForm.classList.remove("active");
        signupForm.classList.add("active");
        toggleText.innerHTML = "Já tem uma conta? <a href='#' onclick='toggleForm()'>Login</a>";
    } else {
        loginForm.classList.add("active");
        signupForm.classList.remove("active");
        toggleText.innerHTML = "Não tem uma conta? <a href='#' onclick='toggleForm()'>Cadastre-se</a>";
    }
}
