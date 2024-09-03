// pages/ProductPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../styles/productPage.css';
import logo from '../assets/images/logoBlack.png';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        //fetching data for a product with ID 
        const response = await axios.get('https://api.example.com/products/1');
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product data. Please try again later.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">No product data available.</div>;

  return (
    <div className="product-page">
      <header className='product-header'>
        <nav className='product-nav'>
          <img src={logo} alt="Logo" className="logo" />
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button>Search</button>
          </div>
          <div className="nav-right">
            <button className="logout-btn">Logout</button>
            <span className="cart-icon" role="img" aria-label="Shopping Cart">🛒</span>
          </div>
        </nav>
      </header>

      <main>
        <section className="product-details">
          <div className="product-images">
            {product.images.map((img, index) => (
              <img key={index} src={img} alt={`${product.name} view ${index + 1}`} />
            ))}
          </div>
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="description">{product.description}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </section>

        <section className="reviews">
          <h2>Customer Reviews</h2>
          {product.reviews.map(review => (
            <div key={review.id} className="review">
              <p className="review-user">{review.user}</p>
              <p className="review-rating">Rating: {review.rating}/5</p>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Crafitori. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProductPage;