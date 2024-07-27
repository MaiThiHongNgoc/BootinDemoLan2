// productUtils.js
export const mergeProducts = (cartProducts = [], products = []) => {
    // Kiểm tra nếu các đối số là mảng
    if (!Array.isArray(cartProducts) || !Array.isArray(products)) {
        throw new TypeError('Both cartProducts and products must be arrays');
    }

    const productMap = {};

    // Gộp các sản phẩm từ danh sách sản phẩm
    products.forEach(item => {
        if (item.product && item.product.product_id) {
            if (productMap[item.product.product_id]) {
                productMap[item.product.product_id].quantity += item.quantity;
            } else {
                productMap[item.product.product_id] = {
                    ...item,
                    product: { ...item.product } // Đảm bảo không thay đổi đối tượng sản phẩm gốc
                };
            }
        }
    });

    // Gộp các sản phẩm từ giỏ hàng
    cartProducts.forEach(cartItem => {
        if (cartItem.product && cartItem.product.product_id) {
            if (productMap[cartItem.product.product_id]) {
                productMap[cartItem.product.product_id].quantity += cartItem.quantity;
            } else {
                productMap[cartItem.product.product_id] = {
                    ...cartItem,
                    product: { ...cartItem.product } // Đảm bảo không thay đổi đối tượng sản phẩm gốc
                };
            }
        }
    });

    // Chuyển đổi thành mảng và tính tổng số lượng và tổng giá
    const mergedProducts = Object.values(productMap);
    const totalQuantity = mergedProducts.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = mergedProducts.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

    return { mergedProducts, totalQuantity, totalPrice };
};
