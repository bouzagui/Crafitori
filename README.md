# Crafitori: Handmade Crafts Marketplace

Crafitori is an online marketplace designed for buying and selling handmade, high-quality crafted goods. It connects skilled craftspeople with customers who appreciate unique, artisanal products. The platform is inspired by marketplaces like Etsy, with a focus on showcasing the craftsmanship behind each item.

---

## Features

### User Features
- **Browse Products**: Explore a wide range of handmade items, including furniture, decor, and more.
- **Search and Filter**: Easily find products by category, material, price range, or artisan.
- **Product Reviews**: Read and write reviews for items to help others make informed decisions.
- **Secure Payments**: Pay using secure methods, including PayPal and credit/debit cards.
- **Wishlist**: Save your favorite items for future purchases.

### Artisan Features
- **Create a Shop**: Register as a seller and set up your personalized storefront.
- **Product Management**: Add, update, or remove listings, complete with images and descriptions.
- **Order Management**: View and manage incoming orders efficiently.
- **Sales Insights**: Track sales and revenue through detailed analytics.

### Admin Features
- **User Management**: Monitor and manage user accounts (buyers and sellers).
- **Product Approval**: Approve or reject product listings to ensure quality.
- **Analytics Dashboard**: Access platform-wide statistics for growth tracking.

---

## Tech Stack

### Backend
- **Framework**: Django REST Framework
- **Database**: PostgreSQL for secure and scalable data storage. Sqlite for Developement

### Frontend
- **Framework**: React for a responsive and dynamic user experience.
- **Styling**: Tailwind CSS for sleek and modern design.

### Deployment
- **Server**: Nginx and Gunicorn for serving the application.
- **Hosting**: Deployed on AWS cloud platform 

---

## Installation and Setup

### Prerequisites
- Python 3.10+
- Node.js and npm
- PostgreSQL

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/AbdeljalilOuafi/Crafitori.git
   cd Crafitori/backend
   ```
2. Install dependencies:
   ```bash
   python3 -m venv myenv
   source myenv/bin/activate
   pip install -r requirements.txt
   ```
3. Set up environment variables:
   - Create a `.env` file in the root of the project with:
     ```env
     RESEND_API_KEY=resend-api-key
     PAYPAL_CLIENT_ID=your-paypal-client-id
     PAYPAL_SECRET=your-paypal-secret
     ```
4. Run database migrations:
   ```bash
   python3 manage.py migrate
   ```
5. Start the development server:
   ```bash
   python3 manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Contribution Guidelines

We welcome contributions from developers and designers! Here’s how you can help:

1. Fork the repository and create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes and test thoroughly.
3. Submit a pull request with a detailed description of your changes.

---

## Roadmap

### Future Features
- **Mobile App**: Launch a mobile version for iOS and Android.
- **Language Support**: Add multilingual support for global accessibility.
- **Personalized Recommendations**: Implement AI-driven recommendations based on user preferences.
- **Community Features**: Enable artisans to blog and share crafting tutorials.

---

## License

Crafitori is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Connect With Us

Feel free to connect with our team for any queries, suggestions, or feedback:

- **Abdeljalil Ouafi:** - [abdeljalilouafi55@gmail.com](mailto:abdeljalilouafi55@gmail.com)
- **Abdelhakim Joulal:** - [joulal1994@gmail.com](mailto:joulal1994@gmail.com)
