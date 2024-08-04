import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById } from '../../Backend/Service (1)/productService';
import { addProductToCart, updateCartItem } from '../../Backend/Service (1)/cartItemsService';
import { getPurchasedProductsByUserId } from '../../Backend/Service (1)/cartService';
import './productDetail.css';
import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';
import { AuthContext } from '../../AuthContext';
import { RxSlash } from "react-icons/rx";
import { showMessage } from '../../Cart/message';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [cartIconState, setCartIconState] = useState({});
  const { updateCart } = useContext(AuthContext);

  useEffect(() => {
    console.log('Product ID:', productId); // Debugging

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
        const existingItem = cartData[0].cart_Product.find(item => item.product.product_id === product.product_id);

        if (existingItem) {
          await updateCartItem(existingItem.cart_item_id, {
            cart: { cart_id: cartId },
            product: { product_id: product.product_id },
            quantity: existingItem.quantity + quantity,
            total_price: (existingItem.quantity + quantity) * product.price
          });
        } else {
          await addProductToCart(cartId, product.product_id, quantity, token);
        }

        setCartIconState(prevState => ({
          ...prevState,
          [product.product_id]: 'spinning'
        }));

        setTimeout(() => {
          setCartIconState(prevState => ({
              ...prevState,
              [product.product_id]: 'checkmark'
          }));
          showMessage('Product successfully added to cart!', 'success');
          setSuccess(true);
        }, 1000);
      } else {
        setError('No cart found for user.');
        setShowNotification(true);
      }
    } catch (error) {
      showMessage('Failed to add product to cart.');
      setShowNotification(true);
    }
  };

  const handleCartClick = () => {
    if (product) {
      handleAddProductToCart(product);
    }
  };

  const handleFeedbackClick = () => {
    navigate('/feedback', { state: { productId } });
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  };

  return (
    <div>
      <Header />
      <div className='proDetail'>
        <h1 className='shop-product'>Products</h1>
        <div className='shop-bread'>
          <div className='shop-crumb'>
            <Link to='/' className='shop-a'>Home</Link>
            <span className='shop-delimiter'>
              <i className='shop-i'><RxSlash /></i>
            </span>
            <span className='shop-current'>Products
              <i className='shop-i'><RxSlash /></i>
            </span>
            <span>{product && (<h4 className='shop-current'>{product.product_name}</h4>)}</span>
          </div>
        </div>
      </div>
    <div className="product-detail">
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {product && (
        <>
          <div className="product-image-container">
            <img src={product.imgProducts[0]?.img_url} alt={product.product_name} className="product-image-detail" />
          </div>
          <div className="product-into">
            <h1 className="product-name">{product.product_name}</h1>
            <p className="product-author">Author: {product.author.author_name}</p>
            <p className="product-category">categories: {product.categories.category_name}</p>
            <p className="product-price"> ${product.price}</p>
            <div className="product-quantity">
              <button onClick={() => handleQuantityChange(-1)} className="pro-button">-</button>
              <input type="number" min="1" value={quantity} readOnly className="pro-input" />
              <button onClick={() => handleQuantityChange(1)} className="pro-button">+</button>

              </div>
              <button onClick={handleCartClick} className="add-to-cart-button">
                Thêm vào giỏ hàng
              </button>
            </div>
          </>
        )}
      </div>
      {product && (
        <div className="product-description-container">
          <p className="product-description">{product.description}</p>
        </div>
      )}
      <Link to={`/feedback/${productId}`}>view</Link>
      <div>
        <button onClick={handleFeedbackClick}>Gửi Feedback</button>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
