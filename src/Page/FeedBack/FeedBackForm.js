import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';
import { RxSlash } from "react-icons/rx";
import "./FeedBack.css";

// Đối tượng ánh xạ mô tả cho các mức độ đánh giá
const ratingDescriptions = {
    1: 'Currency',
    2: 'Dissatisfied',
    3: 'Normal',
    4: 'Satisfied',
    5: 'wonderful'
};

const StarRating = ({ rating, onRatingChange }) => {
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleClick = (value) => {
        onRatingChange(value);
    };

    const handleMouseEnter = (value) => {
        setHoveredRating(value);
    };

    const handleMouseLeave = () => {
        setHoveredRating(0);
    };

    const getStarColor = (starValue) => {
        if (hoveredRating >= starValue) return '#ffc107'; // Màu khi hover
        if (rating >= starValue) return '#ffc107'; // Sao đã được chọn
        if (rating > (starValue - 1) && rating < starValue) return '#ffc107'; // Sao một phần
        return '#e4e5e9'; // Sao chưa được chọn
    };

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((starValue) => (
                <span
                    key={starValue}
                    onClick={() => handleClick(starValue)}
                    onMouseEnter={() => handleMouseEnter(starValue)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        cursor: 'pointer',
                        fontSize: '24px',
                        color: getStarColor(starValue),
                        position: 'relative',
                        display: 'inline-block',
                    }}
                >
                    {'★'}
                    {(rating > (starValue - 1) && rating < starValue) && (
                        <span
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                color: '#e4e5e9',
                                width: `${(1 - (rating % 1)) * 100}%`,
                                overflow: 'hidden',
                                fontSize: '24px',
                            }}
                        >
                            {'★'}
                        </span>
                    )}
                </span>
            ))}
            <span style={{ marginLeft: '10px', fontSize: '18px' }}>
                {rating.toFixed(1)} sao - {ratingDescriptions[Math.round(rating)] || ''}
            </span>
        </div>
    );
};

const FeedbackForm = () => {
    const location = useLocation();
    const { productId } = location.state || {}; // Lấy productId từ state
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:9191/api/products/v1/${productId}`);
                setProduct(response.data);
            } catch (err) {
                console.error('Error fetching product:', err);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Giả sử token được sử dụng cho xác thực

        if (!token) {
            setError('Bạn cần đăng nhập để gửi feedback.');
            return;
        }

        try {
            // Giải mã token JWT để lấy vai trò người dùng
            const payload = JSON.parse(atob(token.split('.')[1]));
            const role = payload.scope;

            // Kiểm tra vai trò người dùng
            if (role !== 'ADMIN' && role !== 'USER') {
                setError('Chỉ người dùng có quyền ADMIN hoặc USER mới có thể gửi feedback.');
                return;
            }
            const user_id = localStorage.getItem('user_id');
            await axios.post(
                `http://localhost:9191/feedback/`,
                {
                    users: {
                        user_id: user_id
                    },
                    products: {
                        product_id: productId
                    },
                    rating,
                    comment
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccess('Feedback đã được gửi thành công!');
            setRating(1); // Reset rating
            setComment(''); // Reset comment
        } catch (err) {
            setError('Có lỗi xảy ra khi gửi feedback.');
            console.error('Error submitting feedback:', err);
        }
    };

    return (
        <div>
            <Header />
            <div className='shop-title'>
                <h1 className='shop-product'>Feaback</h1>
                <div className='shop-bread'>
                    <div className='shop-crumb'>
                        <a href='/' className='shop-a'>Home</a>
                        <span className='shop-delimiter'>
                            <i className='shop-i'><RxSlash /></i>
                        </span>
                        <span className='shop-current'>Feaback</span>
                    </div>
                </div>
            </div>

            <div className="feedback-form-container">
                {product && (
                    <div className="product-info">
                        <div className="product-img">
                            <img src={product.imgProducts[0]?.img_url} alt={product.product_name} className="back-shop-image" />
                        </div>
                        <div className="product-details">
                            <h1>{product.product_name}</h1>
                            <p>{product.description}</p>
                            <form className='feed-form' onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className='title-feaback'>Evaluations:</label>
                                <StarRating rating={rating} onRatingChange={setRating} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="comment" className='title-feaback'>Comments:</label>
                                <textarea className='feed-text'
                                    id="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>
                            <button className='feed' type="submit">Feedback</button>
                        </form>
                        </div>
                    </div>
                )}
                {success && <p className="success-message">{success}</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
            <Footer />
        </div>
    );
};

export default FeedbackForm;
