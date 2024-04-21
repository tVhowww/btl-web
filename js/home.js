import productArr from "./product-data.js";

// mặc định khi load trang sẽ render Kính Cận
const defaultCategory = "Kính Cận";
localStorage.setItem("defaultCategory", defaultCategory);

// Render trang chủ
document.addEventListener('DOMContentLoaded', function () {
    let getCate = localStorage.getItem("category");
    if (!getCate) {
        getCate = localStorage.getItem("defaultCategory");
    }
    renderProducts(getCate);
    // setActive
    for (let i = 0; i < categoryLink.length; i++) {
        categoryLink[i].classList.remove('active');
        if (categoryLink[i].textContent.trim() === getCate) {
            categoryLink[i].classList.add('active');
        }
    }
});

// click vào danh mục -> render sản phẩm
var categoryLink = document.querySelectorAll('.category-nav__link');
categoryLink.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        // setActive
        for (let i = 0; i < categoryLink.length; i++) {
            categoryLink[i].classList.remove('active');
        }
        event.currentTarget.classList.add('active');
        renderProducts(link.textContent.trim());
    });
});

// hàm render sản phẩm dựa trên loại sản phẩm được chọn
function renderProducts(category) {
    // Lấy dữ liệu sản phẩm
    var products = getProductData(category);

    // Chọn phần tử container để render sản phẩm
    var productContainerHome = document.getElementById('productContainerHome');

    // Xóa bỏ nội dung cũ trong container
    productContainerHome.innerHTML = '';

    var str = "";
    for (let i = products.length - 1; i >= products.length - 5; i--) {
        str += `
        <div class="col-xs-12 col-sm-6 col-md-4 col-2-4">
            <a class="product-item" href="product-detail.html" id="${products[i].id}">
                <img src="${products[i].image[0]}" alt="Kính" class="product-img">

                <div class="product-img-hover">
                    <button class="btn-add-to-cart" type="button" data-bs-toggle="tooltip" data-bs-placement="left" title="Thêm vào giỏ hàng">
                        <span>
                            <i class="fa-solid fa-cart-shopping"></i>
                        </span>
                    </button>
                </div>

                <div class="product-desc">
                    <h6 class="product-category text-uppercase">${products[i].category}</h6>
                    <span class="product-name">${products[i].name}</span>
                    <span class="product-price">${products[i].price}</span>
                </div>
            </a>
        </div>
        `

    }
    productContainerHome.innerHTML = str;
    // move to detail
    moveToDetail();
}

// hàm lấy dữ liệu sản phẩm dựa trên loại
function getProductData(category) {
    return productArr.filter(product => product.category === category);
}

// move to detail
function moveToDetail() {
    const productList = document.querySelectorAll(".product-item");
    productList.forEach((product) => {
        product.addEventListener("click", () => {
            localStorage.clear();
            localStorage.setItem("id", product.id);
            const cate = product.querySelector(".product-category").textContent;
            localStorage.setItem("category", cate);
        });
    });
}


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
            localStorage.clear();
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


