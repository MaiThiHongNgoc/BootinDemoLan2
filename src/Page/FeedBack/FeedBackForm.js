import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const FeedbackForm = () => {
    const location = useLocation();
    const { productId } = location.state || {}; // Lấy productId từ state
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Assuming token is used for authentication

        if (!token) {
            setError('Bạn cần đăng nhập để gửi feedback.');
            return;
        }

        try {
            // Decode JWT token to get user role
            const payload = JSON.parse(atob(token.split('.')[1]));
            const role = payload.scope;

            // Check if the user role is ADMIN or USER
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
        <div className="feedback-form">
            <h2>Gửi Feedback</h2>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="rating">Đánh giá:</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Nhận xét:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button type="submit">Gửi Feedback</button>
            </form>
        </div>
    );
};

export default FeedbackForm;
