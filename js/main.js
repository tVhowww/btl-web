import productArr from "./product-data.js"
let openMenu = true
let openSubNav = true

function handelMobileNav() {
    //handle Responsive Mobile
    $('.open-menu').click(() => {
        if (openMenu) {
            $('.nav-mobile').css({
                'left': '0%',
                'visibility': 'visible'
            })
        } else {
            $('.nav-mobile').css({
                'left': '-100%',
                'visibility': 'hidden'
            })
        }
        openMenu = !openMenu
    })

    $('.nav-mobile__item--has-prod').click(() => {
        if (openSubNav) {
            $('.nav__prod--mobile').addClass('sub-nav__mobile')
            openSubNav = true
        } else {
            $('.nav__prod--mobile').removeClass('sub-nav__mobile')
        }
        openSubNav = !openSubNav
    })
}

// Scrolltop


function scrollTopPhone() {
    $('.scroll-top').click(() => {
        $('html, body').scrollTop(0);
    })
}

// Main
$(document).ready(function () {

    // scroll top
    $(window).scroll(() => {
        let posScroll = $('html, body').scrollTop();
        if (posScroll > 700) {
            $('.scroll-top').css({
                'visibility': 'visible'
            })
        } else {
            $('.scroll-top').css({
                'visibility': 'hidden'
            })
        }
        scrollTopPhone()
    })

    // tooltip
    $('[data-bs-toggle="tooltip"]').tooltip();

    // Responsive nav mobile
    handelMobileNav()

    // sign-in
    const isLogin = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));

    const dangNhapTK = document.querySelector("#dangNhapTK");
    const dangNhapTKMobile = document.querySelector('#dangNhapTK-mobile');
    const dangNhapTKMobileSpan = document.querySelector("#dangNhapTK-mobile span");

    if (isLogin === "true" && user) {
        dangNhapTK.innerText = user.fName;
        dangNhapTK.href = "information.html";
        dangNhapTKMobileSpan.innerText = "Tài khoản";
        dangNhapTKMobile.href = "information.html"

        // dangNhapTK.addEventListener("click", () => {
        //     localStorage.setItem("isLoggedIn", "false");
        //     location.reload();
        // });
        // dangNhapTKMobile.addEventListener("click", () => {
        //     localStorage.setItem("isLoggedIn", "false");
        //     location.reload();
        // });
    } else {
        dangNhapTK.href = "sign-in.html";
    }
})


// Search

const search = document.getElementById('search')
const searchRs = document.getElementById('search-rs')
const renderSection = document.getElementById('render-section')

search.addEventListener('focus', function () {
    searchRs.style.display = 'block'
})

document.body.addEventListener('click', function (event) {
    if (event.target !== searchRs && event.target !== search && event.target !== renderSection) {
        searchRs.style.display = 'none';
    }
});

search.addEventListener('input', () => {
    console.log(search.value);
    handleShowResult(search.value);
    moveSearchToDetail();
})

function moveSearchToDetail() {
    const productList = document.querySelectorAll(".result-item");
    productList.forEach((product) => {
        product.addEventListener("click", () => {
            // localStorage.clear();
            localStorage.setItem("id", product.id);
        });
    });
}

function handleShowResult(searchValue) {
    const searchResults = productArr.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    if (searchResults.length > 0) {
        let renderUI = ""
        searchResults.forEach((item) => {
            renderUI += `<a class="result-item" href="product-detail.html" id="${item.id}">
                                    <img class=result-img src="${item.image[0]}" alt="">
                                    <div class="result-info">
                                        <div class="prod-info">
                                            <h5>${item.name}</h5>
                                            <p>${item.category}</p>
                                        </div>
                                        <div class="prod-price">${item.price} VND</div>
                                    </div>
                                </a>`
        })
        renderSection.innerHTML = renderUI
    } else {
        renderSection.innerHTML = `<div class="no-result text-center">Không có kết quả tìm kiếm</div>`
    }
}


// toastr

function toastr({
    title = '',
    message = '',
    type = 'info',
    duration = 3000
}) {
    const main = document.getElementById('toastr');
    if (main) {
        const toastr = document.createElement('div');
        const config = 1000;
        // Auto remove toastr
        const autoRemoveId = setTimeout(function () {
            main.removeChild(toastr);
        }, duration + config);

        // Remove toastr when clicked
        toastr.onclick = function (e) {
            if (e.target.closest('.toastr__close')) {
                main.removeChild(toastr);
                clearTimeout(autoRemoveId);
            }
        }

        const icons = {
            success: 'fas fa-check-circle',
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-circle',
            error: 'fas fa-exclamation-circle'
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toastr.classList.add('toastr', `toastr--${type}`);
        toastr.style.animation = `sliderInLeft ease .3s, fadeOut linear ${config / 1000}s ${delay}s forwards`;

        toastr.innerHTML = `
            <div class="toastr__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toastr__body">
                <h3 class="toastr__title">${title}</h3>
                <p class="toastr__msg">${message}</p>
            </div>
            <div class="toastr__close">
                <i class="fa-solid fa-xmark"></i>
            </div>
        `;
        main.appendChild(toastr);
    }
}

export function showSuccessToastr(mess) {
    toastr({
        title: 'Success',
        message: mess,
        type: 'success',
        duration: 6000
    });
}

export function showErrorToastr(mess) {
    toastr({
        title: 'Error',
        message: mess,
        type: 'error',
        duration: 6000
    });
}