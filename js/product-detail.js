import productArr from "./product-data.js";

const id = localStorage.getItem("id");
const img = document.querySelector(".carousel-inner");
const thumbnails = document.querySelector(".thumbnails");
const detail = document.querySelector(".prod-detail");
const breadcrumbItem = document.querySelectorAll(".breadcrumb-item");

// cách 1
var stringImg = `
    <div class="carousel-item active">
        <img src="${productArr[id - 1].image[0]}" alt="">
    </div>
`
for (let i = 1; i < productArr[id - 1].image.length; i++) {
     stringImg +=
    `
    <div class="carousel-item">
        <img src="${productArr[id - 1].image[i]}" alt="">
    </div>
    `
}

// cách 2
// const stringImg =
//     `
// <div class="carousel-item active">
//     <img src="${productArr[id - 1].image[0]}" alt="">
// </div>

// <div class="carousel-item">
//     <img src="${productArr[id - 1].image[1]}" alt="">
// </div>

// <div class="carousel-item">
//     <img src="${productArr[id - 1].image[2]}" alt="">
// </div>

// <div class="carousel-item">
//     <img src="${productArr[id - 1].image[3]}" alt="">
// </div>

// <div class="carousel-item">
//     <img src="${productArr[id - 1].image[4]}" alt="">
// </div>
// `

///////////////
// cách 1
var stringThumbnail =
    `
    <li class="list-inline-item active">
        <a id="carousel-selector-0" class="selected" data-bs-slide-to="0"
            data-bs-target="#custCarousel">
            <img src="${productArr[id - 1].image[0]}" class="img-fluid">
        </a>
    </li>
    `
for (let i = 1; i < productArr[id - 1].image.length; i++) {
    stringThumbnail +=
    `
    <li class="list-inline-item">
        <a id="carousel-selector-${i}" data-bs-slide-to="${i}" data-bs-target="#custCarousel">
            <img src="${productArr[id - 1].image[i]}" class="img-fluid">
        </a>
    </li>
    `
}

// cách 2
// const stringThumbnail =
//     `
// <li class="list-inline-item active">
//     <a id="carousel-selector-0" class="selected" data-bs-slide-to="0"
//         data-bs-target="#custCarousel">
//         <img src="${productArr[id - 1].image[0]}" class="img-fluid">
//     </a>
// </li>

// <li class="list-inline-item">
//     <a id="carousel-selector-1" data-bs-slide-to="1" data-bs-target="#custCarousel">
//         <img src="${productArr[id - 1].image[1]}" class="img-fluid">
//     </a>
// </li>

// <li class="list-inline-item">
//     <a id="carousel-selector-2" data-bs-slide-to="2" data-bs-target="#custCarousel">
//         <img src="${productArr[id - 1].image[2]}" class="img-fluid">
//     </a>
// </li>

// <li class="list-inline-item">
//     <a id="carousel-selector-3" data-bs-slide-to="3" data-bs-target="#custCarousel">
//         <img src="${productArr[id - 1].image[3]}" class="img-fluid">
//     </a>
// </li>

// <li class="list-inline-item">
//     <a id="carousel-selector-4" data-bs-slide-to="4" data-bs-target="#custCarousel">
//         <img src="${productArr[id - 1].image[4]}" class="img-fluid">
//     </a>
// </li>
// `

const stringDetail =
`
<div class="row">
    <h1 style="font-size: 3rem;">${productArr[id - 1].name}</h1>
</div>
<div class="row">
    <h2 style="color: red;">${productArr[id - 1].price} VND</h2>
</div>
<div class="row detail-desc">
    <span class="detail-label">Màu gọng: </span>
    ${productArr[id - 1].frameColor}
</div>
<div class="row detail-desc">
    <span class="detail-label">Màu Lens: </span>
    ${productArr[id - 1].lensColor}
</div>
<div class="row detail-desc">
    <span class="detail-label">Chất liệu: </span>
    ${productArr[id - 1].material}
</div>
<div class="row detail-desc">
    <span class="detail-label">Tính năng: </span>
    ${productArr[id - 1].function}
</div>
`

img.innerHTML = stringImg;
thumbnails.innerHTML = stringThumbnail;
detail.innerHTML = stringDetail;
breadcrumbItem[2].innerHTML = `<a href="#">${productArr[id - 1].category}</a>`;
breadcrumbItem[3].innerHTML = `${productArr[id - 1].name}`;

//

const thumbnailItems = document.querySelectorAll(".list-inline-item");
thumbnailItems.forEach(thumbnailItem => {
    thumbnailItem.addEventListener("click", (event) => {
        // loại bỏ lớp active từ tất cả các mục thu nhỏ
        document.querySelectorAll(".list-inline-item.active").forEach(item => {
            item.classList.remove("active");
        });
        // thêm lớp active cho mục thu nhỏ được click
        event.currentTarget.classList.add("active");
    });
});

//

document.getElementById('total-temp').value = productArr[id - 1].price.replace(/\./g, ",") + " VND";

const qtyBtns = document.querySelectorAll(".qtyBtn");
const qtyValue = document.querySelector("#qtyVal");

function calcTotal() {
    var priceStr = productArr[id - 1].price;
        var priceTmp = parseInt(priceStr.replace(/\./g, ""));
        var total = qtyValue.value * priceTmp;
        document.getElementById('total-temp').value = total.toLocaleString() + " VND";
}

qtyValue.addEventListener('change', () => {
    calcTotal()
})

qtyBtns[0].addEventListener("click", () => {
    if (qtyValue.value > 1) {
        qtyValue.value--;
        calcTotal()
    }
})

qtyBtns[1].addEventListener("click", () => {
    qtyValue.value++;
    calcTotal()
})
