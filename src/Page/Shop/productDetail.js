import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../Backend/Service (1)/productService';
import { addProductToCart, updateCartItem } from '../../Backend/Service (1)/cartItemsService';
import './productDetail.css';
import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';
import { AuthContext } from '../../AuthContext';
import { getPurchasedProductsByUserId } from '../../Backend/Service (1)/cartService';
import { RxSlash } from "react-icons/rx";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { updateCart } = useContext(AuthContext);
  const [showNotification, setShowNotification] = useState(false);
  const [cartIconState, setCartIconState] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (error) {
        setError('Không thể lấy thông tin chi tiết về sản phẩm. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (amount) => {
    setQuantity(prevQuantity => Math.max(prevQuantity + amount, 1));
  };

  const handleAddProductToCart = async (product) => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    if (!token || !user_id) {
      setShowNotification(true);
      return;
    }
    try {
      const cartData = await getPurchasedProductsByUserId(user_id);
      if (cartData.length > 0) {
        const cartId = cartData[0].cart_id;
        const existingItem = cartData[0].cart_Product.find(item => item.product_id === product.product_id);
        if (existingItem) {
          await updateCartItem(existingItem.cart_item_id, {
            cart: { cart_id: cartId },
            product: { product_id: product.product_id },
            quantity: existingItem.quantity + 1,
            total_price: (existingItem.quantity + 1) * product.price,
          });
        } else {
          // Đảm bảo product_id không phải là null
          if (product.product_id) {
            await addProductToCart(cartId, product.product_id, 1, token);
          } else {
            console.error('ID sản phẩm là null hoặc không xác định');
            setError('Không thêm được sản phẩm vào giỏ hàng. Thiếu ID sản phẩm.');
            setShowNotification(true);
          }
        }
        setCartIconState(prevState => ({ ...prevState, [product.product_id]: 'spinning' }));
        setTimeout(() => {
          setCartIconState(prevState => ({ ...prevState, [product.product_id]: 'checkmark' }));
        }, 1000);
      } else {
        console.error('Không tìm thấy giỏ hàng cho người dùng');
        setError('Không tìm thấy giỏ hàng cho người dùng.');
        setShowNotification(true);
      }
    } catch (error) {
      console.error('Không thêm được sản phẩm vào giỏ hàng:', error.message);
      setError('Không thêm được sản phẩm vào giỏ hàng.');
      setShowNotification(true);
    }
  };

  const handleCartClick = (product) => {
    handleAddProductToCart(product);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    if (!localStorage.getItem('token')) {
      window.location.href = '/đăng nhập';
    }
  };

  return (
    <div>
      <Header />
      <div className='proDetail'>
      <h1 className='shop-product'>Products</h1>
        <div className='shop-bread'>
          <div className='shop-crumb'>
            <a href='/' className='shop-a'>Home</a>
            <span className='shop-delimiter'>
              <i className='shop-i'><RxSlash /></i>
            </span>
            <span className='shop-current'>Products
            <i className='shop-i'><RxSlash /></i>
            </span>
            {/* <span className='shop-current'>{product.product_name}</span> */}
          </div>
        </div>
      </div>
      <div className="product-detail">
        {product && (
          <>
            <h1 className="product-name">{product.product_name}</h1>
            <img src={product.imgProducts[0]?.img_url} alt={product.product_name} className="product-image" />
            <p className="product-author">Tác giả: {product.author.author_name}</p>
            <p className="product-category">Thể loại: {product.categories.category_name}</p>
            <p className="product-price">Giá: ${product.price}</p>
            <p className="product-description">{product.description}</p>
            <div className="product-quantity">
              <button onClick={() => handleQuantityChange(-1)} className="quantity-button">-</button>
              <input type="number" min="1" value={quantity} readOnly className="quantity-input" />
              <button onClick={() => handleQuantityChange(1)} className="quantity-button">+</button>
            </div>
            <button onClick={handleCartClick} className="add-to-cart-button">
              Thêm vào giỏ hàng
            </button>
            {success && <p className="success-message">Đã thêm vào giỏ hàng!</p>}
          </>
        )}
        <div className="product-detail-buttons"></div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
