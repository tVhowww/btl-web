import productArr from "./product-data.js";

$(document).ready(function () {
    const cartProdStr = localStorage.getItem('productQuantity')

    const cartInner = document.getElementById('cart-inner');
    let total = 0;
    let shipFee = 300000;

    if (!cartProdStr) {
        var noCart =
            `<div id="no-cart" style="font-size: 1.4rem;" class="d-flex flex-column align-items-center justify-content-center text-center mb-5">
                <h1 style="font-size: 4.2rem;color: #555;">Chưa có sản phẩm nào trong giỏ hàng.</h1>
                <p>Trước khi tiến hành thanh toán, bạn phải thêm một số sản phẩm vào giỏ hàng của mình.
                    Bạn sẽ tìm thấy rất nhiều sản phẩm thú vị trên trang "Cửa hàng" của chúng tôi.</p>
                <a href="product.html" class="btn btn-info py-3 px-5 fw-bolder">Quay lại cửa hàng</a>
            </div>`;
        cartInner.innerHTML = noCart;
    } else {
        const cartProdObj = JSON.parse(cartProdStr);
        const cartProdId = Object.keys(cartProdObj);
        const cartLength = cartProdId.length;
        // console.log(cartProdObj);
        // console.log(cartLength);


        var prodRender = '';
        // let idCounter = 0; // Biến đếm cho id

        for (let i = 0; i < cartLength; i++) {
            const productId = cartProdId[i];
            const product = productArr[productId - 1];
            const productPrice = parseInt(product.price.replace(/\./g, ''));
            const quantity = cartProdObj[productId];
            const subtotal = productPrice * quantity;
            total += subtotal;
            console.log(total);
            if (total >= 10000000) {
                shipFee = 0;
                console.log(shipFee);
            }

            // const rowId = `cart-row-${idCounter++}`; // Tạo id duy nhất cho mỗi dòng
            const rowId = `cart-row-${productId - 1}`;
            // console.log(rowId);

            prodRender +=
                `<tr id="${rowId}">
                    <td>
                        <i class="fa-solid fa-xmark btn-close"></i>
                    </td>
                    <td>
                        <img src="${product.image[0]}" alt="">
                    </td>
                    <td>
                        ${product.name}
                    </td>
                    <td>
                        ${product.price.replace(/\./g, ',')}
                    </td>
                    <td>
                        <div class="quantity">
                            <input type="button" value="-" class="qtyBtn minus" data-row="${rowId}">
                            <input type="number" name="quantity" class="qtyVal" value="${quantity}" min="1" max step="1"
                                inputmode="numeric" autocomplete="off" data-row="${rowId}">
                            <input type="button" value="+" class="qtyBtn plus" data-row="${rowId}">
                        </div>
                    </td>
                    <td id="subtotal-${rowId}">
                        ${subtotal.toLocaleString()} VND
                    </td>
                </tr>`;
        }

        const hasCart =
            `<div id="has-cart" class="row">
                <div class="col-md-8">
                    <table id="table-wrap" class="table text-center">
                        <thead>
                            <tr>
                                <th colspan="3">Sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Tạm tính</th>
                            </tr>
                        </thead>
                        <tbody id="tbl">
                            ${prodRender}
                        </tbody>
                    </table>
                </div>
                <div class="col-md-4">
                    <div class="cart-total-wrap">
                        <h2>CỘNG GIỎ HÀNG</h2>
                        <div class="cart-total">
                            <div class="row">
                                <div>
                                    Tạm tính
                                </div>
                                <div id="totalTmp">
                                    ${total.toLocaleString()}
                                </div>
                            </div>
                            <div class="row">
                                <div>
                                    Phí giao hàng
                                </div>
                                <div id="shipFee">
                                    ${shipFee.toLocaleString()}
                                </div>
                            </div>
                            <div class="row">
                                <div>
                                    Tổng
                                </div>
                                <div id="total">
                                    ${(total + shipFee).toLocaleString()}
                                </div>
                            </div>
                        </div>
                        <spans style="font-style: italic;color: red">* đơn hàng trên 10,000,000 VND sẽ được freeship</spans>
                        <button type="button" class="btn btn-block btn-dark">TIẾN HÀNH THANH TOÁN</button>
                    </div>
                </div>
            </div>`;
        cartInner.innerHTML = hasCart;
    }

    const qtyBtns = document.querySelectorAll(".qtyBtn");
    const qtyValues = document.querySelectorAll(".qtyVal");

    function calcTotal() {
        let total = 0;
        qtyValues.forEach((qtyValue) => {
            const productId = qtyValue.getAttribute("data-row").split('-')[2];
            const productPrice = parseInt(productArr[productId].price.replace(/\./g, ''));
            const subtotal = qtyValue.value * productPrice;
            total += subtotal;
            if (total >= 10000000) {
                shipFee = 0;
                console.log(shipFee);
                document.getElementById('shipFee').textContent = shipFee.toLocaleString()
            }
            document.getElementById('subtotal-' + qtyValue.getAttribute("data-row")).textContent = subtotal.toLocaleString() + " VND";
        });
        document.getElementById('totalTmp').textContent = total.toLocaleString()
        document.getElementById('total').textContent = (total + shipFee).toLocaleString()
    }

    qtyValues.forEach((qtyValue) => {
        qtyValue.addEventListener('change', () => {
            calcTotal();
        });
    });

    qtyBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const rowId = btn.getAttribute("data-row");
            const qtyValue = document.querySelector(`.qtyVal[data-row="${rowId}"]`);
            let quantity = parseInt(qtyValue.value);

            if (btn.classList.contains("minus") && quantity > 1) {
                quantity--;
            } else if (btn.classList.contains("plus")) {
                quantity++;
            }

            qtyValue.value = quantity;
            calcTotal();
        });
    });

    // Sự kiện xóa sản phẩm khi click vào nút btn-close
    const closeButtons = document.querySelectorAll(".btn-close");
    closeButtons.forEach((closeBtn) => {
        closeBtn.addEventListener("click", (event) => {
            const rowId = closeBtn.closest("tr").id;
            const qtyValue = document.querySelector(`.qtyVal[data-row="${rowId}"]`);
            const productId = rowId.split("-")[2];
            console.log(parseInt(productId) + 1);

            const rowElement = document.getElementById(rowId);
            rowElement.parentNode.removeChild(rowElement);

            const productPrice = parseInt(productArr[productId].price.replace(/\./g, ''));
            const quantity = parseInt(qtyValue.value);
            const subtotal = productPrice * quantity;
            total -= subtotal;

            if (total >= 10000000) {
                shipFee = 0;
            } else {
                shipFee = 300000;
            }
            document.getElementById('shipFee').textContent = shipFee.toLocaleString();

            document.getElementById('totalTmp').textContent = total.toLocaleString();
            document.getElementById('total').textContent = (total + shipFee).toLocaleString();

            // Xóa sản phẩm khỏi localStorage
            const cartProdObj = JSON.parse(localStorage.getItem('productQuantity'));
            delete cartProdObj[parseInt(productId) + 1];
            localStorage.setItem('productQuantity', JSON.stringify(cartProdObj));
            if (Object.keys(cartProdObj).length === 0) {
                localStorage.removeItem('productQuantity');
            }
        });
    });
});
