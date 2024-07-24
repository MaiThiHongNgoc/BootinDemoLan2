export const mergeProducts = (products) => {
    const productMap = {};

    products.forEach(item => {
        if (productMap[item.product.product_id]) {
            productMap[item.product.product_id].quantity += item.quantity;
        } else {
            productMap[item.product.product_id] = { ...item };
        }
    });

    // Chuyển đổi sang mảng và tính tổng số lượng và tổng giá
    const mergedProducts = Object.values(productMap);
    const totalQuantity = mergedProducts.reduce((acc, product) => acc + product.quantity, 0);
    const totalPrice = mergedProducts.reduce((acc, product) => acc + (product.product.price * product.quantity), 0);

    return { mergedProducts, totalQuantity, totalPrice };
};
