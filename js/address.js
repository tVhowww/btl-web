$(document).ready(function () {
    const user = JSON.parse(localStorage.getItem("user"));
    const addressInner = document.getElementById('address-info-inner');

    // đăng xuất
    document.getElementById('log-out-btn').addEventListener('click', () => {
        var choice = confirm('Bạn muốn đăng xuất?');
            if (choice) {
                localStorage.setItem('isLoggedIn', 'false');
                window.location.href = 'home.html';
            }
    })

    var addressDetail =
        `<div class="col-6">
        <div class="address-info-wrap">
            <h4 class="address-title mb-3">
                Địa chỉ
                <span id="default">(mặc định)</span>
            </h4>
            <div class="address-info">
                <p>${user.fName}</p>
                <p>${user.phone}</p>
                <p></p>
            </div>
            <div class="address-action">
                <button id="update-address-btn" class="btn btn-lg btn-light mr-2" type="button" data-bs-toggle="collapse"
                data-bs-target="#updateForm">Chỉnh sửa</button>
                <button class="btn btn-lg btn-light" type="button">Xóa bỏ</button>
            </div>
        </div>
    </div>`
    addressInner.innerHTML = addressDetail

    const updateForm = `
    <div class="collapse w-100 p-4" id="updateForm">
        <h3>Cập nhật địa chỉ</h3>
        <form class="form-address">
            <div class="form-group">
                <label for="">Họ tên</label>
                <input type="text" name="fName" id="fName" class="form-control"
                    placeholder="Họ tên">
            </div>
            <div class="form-group">
                <label for="">Số điện thoại</label>
                <input type="tel" name="phone" id="phone" class="form-control"
                    placeholder="Số điện thoại">
            </div>
            <div class="form-group">
                <label for="">Địa chỉ 1</label>
                <input type="text" name="address1" id="address1" class="form-control"
                    placeholder="Địa chỉ 1">
            </div>
            <div class="form-group">
                <label for="">Địa chỉ 2</label>
                <input type="text" name="address2" id="address2" class="form-control"
                    placeholder="Địa chỉ 2">
            </div>
            <div class="form-group">
                <button id="update-address-btn" class="btn btn-lg btn-dark mr-2" type="button">
                    Cập nhật
                </button>
                <button class="btn btn-lg btn-outline-dark" type="button">
                    Hủy bỏ
                </button>
            </div>
        </form>
    </div>`
    
    var addAddressBtn = document.getElementById('add-address-btn');

    addAddressBtn.addEventListener('click', () => {
        var name = document.getElementById('fName').value;
        var phone = document.getElementById('phone').value;
        var address1 = document.getElementById('address1').value;
        var address2 = document.getElementById('address2').value;

        if (name == '' && phone == '' && address1 == '' && address2 == '') {
            return;
        } else {
            addressInner.innerHTML +=
                `<div class="col-6">
                    <div class="address-info-wrap">
                        <h4 class="address-title mb-3">
                            ${name ? name : 'Địa chỉ'}
                        </h4>
                        <div class="address-info">
                            <p>${name ? name : ''}</p>
                            <p>${phone ? phone : ''}</p>
                            <p>${address1 ? address1 : ''}</p>
                            <p>${address2 ? address2 : ''}</p>
                        </div>

                        <div class="address-action">
                            <button id="update-address-btn" class="btn btn-lg btn-light mr-2" type="button" data-bs-toggle="collapse"
                            data-bs-target="#updateForm">Chỉnh sửa</button>
                            <button class="btn btn-lg btn-light" type="button">Xóa bỏ</button>
                        </div>
                    </div>
                </div>
                `
        }
    })
    // add updateForm
    addressInner.innerHTML += updateForm
});

