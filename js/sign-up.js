import users from './users-data.js';
import { showSuccessToastr, showErrorToastr } from "./main.js";

$(document).ready(function () {

    // Validation
    $("#fName").blur(() => {
        var fName = $("#fName").val();
        if (fName == '')
            return;
        let reg = /^([a-zA-z ?])([a-zA-z ?])*$/;
        if (!reg.test(fName)) {
            return showErrorToastr('Họ tên không được rỗng, không được chứa ký tự đặc biệt');
        }
    })
    $("#email").blur(() => {
        var email = $("#email").val();
        if (email == '')
            return;
        let reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!reg.test(email)) {
            return showErrorToastr('Không đúng định dạng email');
        }
    })
    $("#phone").blur(() => {
        var phone = $("#phone").val();
        if (phone == '')
            return;
        let reg = /^(09|03|07|08|05)[0-9]{8}$/;
        if (!reg.test(phone)) {
            return showErrorToastr('Số điện thoại phải bằng đầu từ 03, 05, 07, 08, 09 và có 10 ký tự số');
        }
    })
    $("#birthDay").blur(() => {
        var birthDay = new Date($("#birthDay").val());
        var today = new Date();

        // Kiểm tra xem ngày sinh có hợp lệ không
        if (isNaN(birthDay.getTime())) {
            return showErrorToastr('Ngày sinh không hợp lệ');
        }

        // Kiểm tra xem ngày sinh có lớn hơn 18 tuổi không
        var age = today.getFullYear() - birthDay.getFullYear();
        var monthDiff = today.getMonth() - birthDay.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay.getDate())) {
            age--;
        }

        if (age < 18) {
            return showErrorToastr('Phải trên 18 tuổi');
        }
    });
    $("#password").blur(() => {
        var password = $("#password").val();
        if (password == '')
            return;
        let reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
        if (!reg.test(password)) {
            return showErrorToastr('Mật khẩu phải có ít nhất 1 ký tự số, 1 ký tự đặc biệt, 1 ký tự in hoa và tối thiểu 8 ký tự');
        }
    })
    $("#confirmPassword").blur(() => {
        var confirmPassword = $("#confirmPassword").val();
        var password = $("#password").val();
        if (confirmPassword == '')
            return;
        if (confirmPassword != password) {
            return showErrorToastr('Mật khẩu không giống nhau');
        }
    })
    // Đăng kí
    // const users = JSON.parse(localStorage.getItem("users"));
    console.log(users);
    document.getElementById("register").onclick = (e) => {
        e.preventDefault();
        document.getElementById("formSignUp").reportValidity();
        var fName = $("#fName").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var password = $("#password").val();
        var confirmPassword = $("#confirmPassword").val();
        var birthDay = $("#birthDay").val();
        var gender = parseInt($(".gender:checked")[0].id);
        if (fName == '' || email == '' || phone == '' || password == '' || confirmPassword == '')
            return;
        const userExists = users.filter(item => item.email === email);
        if (userExists.length > 0) {
            showErrorToastr("Email đã tồn tại");
            return;
        }
        const user = {
            id: users.length + 1,
            fName: fName,
            email: email,
            phone: phone,
            password: password,
            dayOfBirth: birthDay,
            gender: gender
        }
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        showSuccessToastr('Đăng kí thành công.');
        setTimeout(() => {
            window.location = "sign-in.html";
        }, 2000)
    }
});


