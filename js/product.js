import productArr from "./product-data.js";
import { showSuccessToastr, showErrorToastr } from "./main.js";


$(document).ready(function () {
    // render product function
    function renderProducts(start, end) {
        var str = "";
        for (let i = start; i < end; i++) {
            str += `
            <div class="col-xs-12 col-sm-6 col-md-4 col-2-4">
                <div class="product-item" href="product-detail.html" id="${productArr[i].id}">
                    <img src="${productArr[i].image[0]}" alt="Kính" class="product-img">
        
                    <div class="product-img-hover">
                        <button class="btn-add-to-cart" type="button" data-bs-toggle="tooltip" data-bs-placement="left" title="Thêm vào giỏ hàng">
                            <span>
                                <i class="fa-solid fa-cart-shopping"></i>
                            </span>
                        </button>
                    </div>
        
                    <div class="product-desc">
                        <h6 class="product-category text-uppercase">${productArr[i].category}</h6>
                        <span class="product-name">${productArr[i].name}</span>
                        <span class="product-price">${productArr[i].price}</span>
                    </div>
                </div>
            </div>
            `
        }
        document.querySelector("#productContainer").innerHTML = str;
        // move to detail
        const productList = document.querySelectorAll(".product-item");
        productList.forEach((product) => {
            product.addEventListener("click", () => {
                localStorage.setItem("id", product.id);
                window.location.href = "product-detail.html"
            });
        });
    }
    
    // Pagination
    var pagiArr = document.querySelectorAll('.page-item');
    for (let i = 0; i < pagiArr.length; i++) {
        pagiArr[i].addEventListener('click', function (e) {
            localStorage.setItem('page', i + 1);

            e.preventDefault();

            pagiArr.forEach(li => {
                li.classList.remove('active');
            });
            e.currentTarget.classList.add('active');

            var page = localStorage.getItem('page');
            if (page == 1)
                renderProducts(0, 10);
            else if (page == 2)
                renderProducts(11, 21);
            else if (page == 3)
                renderProducts(22, productArr.length);
        });
    }

    // mặc định render 0 -> 10
    var page = localStorage.getItem('page');
    if (!page) {
        renderProducts(0, 10);
    } else {
        pagiArr.forEach(li => {
            li.classList.remove('active');
        });
        if (page == 1) {
            renderProducts(0, 10);
            pagiArr[0].classList.add('active');
        }
        else if (page == 2) {
            renderProducts(11, 21);
            pagiArr[1].classList.add('active');
        }
        else if (page == 3) {
            renderProducts(22, productArr.length);
            pagiArr[2].classList.add('active');
        }
        
    }

    // add to cart
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation();

            const productId = button.closest('.product-item').id;
            // console.log(productId);

            var productQuantity = JSON.parse(localStorage.getItem('productQuantity')) || {};

            if (productQuantity[productId]) {
                productQuantity[productId]++;
            } else {
                productQuantity[productId] = 1;
            }

            localStorage.setItem('productQuantity', JSON.stringify(productQuantity));
            // console.log(productQuantity);
            showSuccessToastr('Thêm vào giỏ hàng thành công.');

        });
    });
});    
