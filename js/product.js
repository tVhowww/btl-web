import productArr from "./product-data.js";
// product
var str = "";
for (let i = 0; i < productArr.length; i++) {
    str += `
    <div class="col-xs-12 col-sm-6 col-md-4 col-2-4">
        <a class="product-item" href="product-detail.html" id="${productArr[i].id}">
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
        </a>
    </div>
    `
}
document.querySelector("#productContainer").innerHTML = str;

// move to detail
const productList = document.querySelectorAll(".product-item");
productList.forEach((product) => {
    product.addEventListener("click", () => {
        localStorage.clear();
        localStorage.setItem("id", product.id);
    });
});


