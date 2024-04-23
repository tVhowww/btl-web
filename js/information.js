$(document).ready(function () {
    const parent = document.getElementById('tbl');
    const user = JSON.parse(localStorage.getItem("user"));

    const gender = user.gender;
    let genderStr = "";
    if (gender === 0)
        genderStr = "Nam"
    else
        genderStr = "Nữ"

    var info =
    `<tr>
        <th>Họ tên</th>
        <td>${user.name}</td>
    </tr>
    <tr>
        <th>Email</th>
        <td>${user.email}</td>
    </tr>
    <tr>
        <th>Số điện thoại</th>
        <td>${user.phone}</td>
    </tr>
    <tr>
        <th>Ngày sinh</th>
        <td>${user.dayOfBirth}</td>
    </tr>
    <tr>
        <th>Giới tính</th>
        <td>${genderStr}</td>
    </tr>
    <tr>
        <th>Password</th>
        <td class="passwordCell d-flex justify-content-between align-items-center">
            <span class="passwordText">************</span>
            <i id="hide-pass" class="fa-regular fa-eye"></i>
        </td>
    </tr>`
    parent.innerHTML = info

    const pwdText = document.querySelector('.passwordText');
    const hidePwd = document.querySelector('#hide-pass');

    hidePwd.addEventListener('click', () => {
        const isPasswordVisible = pwdText.classList.contains('passwordVisible');

        if (isPasswordVisible) {
            // Hide the password
            pwdText.textContent = `************`;
            pwdText.classList.remove('passwordVisible');
            hidePwd.classList.remove('fa-eye-slash');
            hidePwd.classList.add('fa-eye');
        } else {
            // Show the password
            pwdText.textContent = `${user.password}`;
            pwdText.classList.add('passwordVisible');
            hidePwd.classList.remove('fa-eye');
            hidePwd.classList.add('fa-eye-slash');
        }
    });
});
