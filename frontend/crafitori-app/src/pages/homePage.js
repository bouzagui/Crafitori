// HomePage.js
import React from 'react';
import '../styles/homePage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from '../assets/images/logoBlack.png'

const HomePage = () => {
    return (
      <div className="container">
        <header className="header">
          <div className="navbar">
            <div className="logo">
              <img src={Logo} alt='logoBlack' className='logo-img' />
            </div>
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <button className="search-icon">
                  <i class="bi bi-search"></i>
              </button>
            </div>
            <div className="auth-btn">
              <button className='login-btn'>Login</button>
              <button className='signp-btn'>Sign Up</button>
            </div>
          </div>
        </header>

        <section className="hero">
          <div className="promo-card blue">
            <h2>From Craftsmen To Your Hands</h2>
            <p>Shop Authentic, Handcrafted Goods Today!</p>
            <button className="cta-button">SHOP NOW</button>
            {/* <div className="image-overlay"></div> */}
          </div>
          <div className="promo-card orange">
            <h2>Sell Your Craft To Every Corner Of Morocco</h2>
            <p>Showcase Your Work To A Nationwide Audience!</p>
            <button className="cta-button">Become A Seller</button>
            {/* <div className="image-overlay"></div> */}
          </div>
        </section>

        <section className="categories">
          <div className="category-item">
            <div className="category-icon">🧺</div>
            <span>Basket Weaving</span>
          </div>
          <div className="category-item">
            <div className="category-icon">🛋️</div>
            <span>Upholstery</span>
          </div>
          <div className="category-item">
            <div className="category-icon">🧵</div>
            <span>Carpet Weaving</span>
          </div>
          <div className="category-item">
            <div className="category-icon">🍳</div>
            <span>Copper Work</span>
          </div>
          <div className="category-item">
            <div className="category-icon">🧵</div>
            <span>Embroidery</span>
          </div>
          <div className="category-item">
            <div className="category-icon">💍</div>
            <span>Jewelry Making</span>
          </div>
        </section>

        <section className="best-selling">
          <h2>Best Selling</h2>
          <div className="product-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="product-card">
                <img src={`https://via.placeholder.com/150?text=Product${item}`} alt={`Product ${item}`} />
                <h3>Moroccan Sopha</h3>
                <p>199.99 DH</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

export default HomePage;