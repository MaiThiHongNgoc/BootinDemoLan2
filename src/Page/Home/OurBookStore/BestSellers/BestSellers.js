import React, { useState, useEffect } from 'react';
import { getProducts } from '../../../../Backend/Service/productService';
import '../TopRating/TopRating.css';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRandomProducts();
  }, []);

  const loadRandomProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getProducts();
      const allProducts = response.data.content;
      const randomProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, 10);
      setProducts(randomProducts);
    } catch (error) {
      console.error('Failed to fetch products', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='top-rating'>
      <div className="top-rating-container">
        {loading && <p className="top-rating-loading">Loading...</p>}
        {error && <p className="top-rating-error">{error}</p>}
        <div className="top-rating-grid">
          {products.map((product) => (
            <div key={product.product_id} className="top-rating-card">
              <div className="top-rating-image-container">
                <img src={product.imgProducts[0]?.img_url} alt={product.product_name} className="top-rating-image" />
              </div>
              <h2 className="top-rating-product-name">{product.product_name}</h2>
              <p className="top-rating-author-name">{product.author.author_name}</p>
              <p className="top-rating-price">Price: ${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
