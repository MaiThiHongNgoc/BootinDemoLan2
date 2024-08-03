import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./FeedBack.css";

const FeedbackList = () => {
    const { productId } = useParams(); // Get productId from URL
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get(`http://localhost:9191/feedback/${productId}`);
                setFeedbacks(response.data);
                setLoading(false);
            } catch (err) {
                setError();
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, [productId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="feedback-list">
            <h2>Feedbacks for Product ID: {productId}</h2>
            {feedbacks.length === 0 ? (
                <p>No feedbacks available for this product.</p>
            ) : (
                <ul>
                    {feedbacks.map((feedback) => (
                        <li key={feedback.id} className="feedback-item">
                            <div className="feedback-user">
                                <strong>User:</strong> {feedback.users.username}
                            </div>
                            <div className="feedback-product">
                                <strong>Product:</strong> {feedback.products.product_name}
                            </div>
                            <div className="feedback-rating">
                                <strong>Rating:</strong> {feedback.rating}
                            </div>
                            <div className="feedback-comment">
                                <strong>Comment:</strong> {feedback.comment}
                            </div>
                            <div className="feedback-date">
                                <strong>Date:</strong> {new Date(feedback.created_at).toLocaleDateString()}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FeedbackList;
