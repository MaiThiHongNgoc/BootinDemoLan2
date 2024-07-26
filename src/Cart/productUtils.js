// productUtils.js
export const mergeProducts = (cartProducts) => {
    const mergedProducts = cartProducts.map(item => ({
        cart_item_id: item.cart_item_id,
        quantity: item.quantity,
        product: item.product
    }));

    const totalQuantity = mergedProducts.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = mergedProducts.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

    return { mergedProducts, totalQuantity, totalPrice };
};
