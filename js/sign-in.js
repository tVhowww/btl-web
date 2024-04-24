import { showSuccessToastr, showErrorToastr } from "./main.js";

$(document).ready(function () {
    localStorage.setItem("isLoggedIn", "false");
    const users = JSON.parse(localStorage.getItem("users"));

    // Submit form đăng nhập
    $("#submit").click(function (e) {
        e.preventDefault()
        document.getElementById("formLogin").reportValidity();
        var email = $("#input-email").val();
        var password = $("#input-password").val();
        if (email == '' || password == '')
            return;
        var user = users.filter(u => u.email === email);
        if (user.length == 0 || user[0].password !== password || !user) {
            showErrorToastr('Tài khoản hoặc mật khẩu không chính xác')
        }
        else {
            user = user[0];
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isLoggedIn", "true");
            const spinner = document.querySelector('.spinner-border');
            spinner.style.visibility = "visible";
            setTimeout(() => {
                window.location = "home.html";
            }, 2000)
        }

    })
});