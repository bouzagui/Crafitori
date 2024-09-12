import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../components/axios/axiosInstance'; // Adjust the path accordingly
import Navbar from '../components/navBar/Navbar';
import { CartContext } from '../context/CartContext';
import {handleAddToCart} from '../context/handleAddToCart';
import Footer from '../components/footer/Footer';




const ProductDetailPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImg, setActiveImage] = useState(''); // State for active image
    const [amount, setAmount] = useState(1);
    const { addToCart } = useContext(CartContext);
    const [clickedProductId, setClickedProductId] = useState(null);



    useEffect(() => {
        axiosInstance.get(`/products/${productId}/`)
            .then(response => {
                const productData = response.data;

                // Set the first image from the API as the active image if available
                if (productData.images && productData.images.length > 0) {
                    setActiveImage(productData.images[0].image); // Use .image to get the URL
                }

                setProduct(productData); // Set product data after handling images
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
                setLoading(false);
            });
    }, [productId]);

    // Log only if product is available
    console.log(product?.images);

    // Ensure product and product.images are defined
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    // Handle case where images array might not be present
    const productImages = product?.images || [];




    const handleAddToCartClick = (item) => {
        setClickedProductId(item.id); // Disable the button for this product
        handleAddToCart(item, amount, addToCart); // Call the cart function
        setTimeout(() => setClickedProductId(null), 1000); // Re-enable after 1 second
      };


    return (
        <div>
          <Navbar />
          <div className='max-w-7xl md:h-full lg:h-screen mx-auto mt-10 p-10 gap- bg-white shadow-md rounded-lg'>
            <div className='flex items-start justify-start flex-col lg:flex-row gap-16 '>
                <div className='flex flex-col gap-6 lg:w-1/3'>
                    {activeImg && (
                        <img src={activeImg} alt="Product Image" className='w-svw h-svw aspect-square object-cover rounded-xl'/>
                    )}
                    <div className='flex flex-row gap-8 h-24 aspect-square'>
                        {productImages.length > 0 ? (
                            productImages.map((imageObj, index) => (
                                <img 
                                    key={index} 
                                    src={imageObj.image} 
                                    alt={`Product image ${index + 1}`} 
                                    className='w-36 h-36 rounded-md cursor-pointer p-1 mb-10' 
                                    onClick={() => setActiveImage(imageObj.image)} 
                                />
                            ))
                        ) : (
                            <p>No images available</p> // Fallback in case no images are found
                        )}
                    </div>
                </div>
                {/* ABOUT */}
                <div className='flex flex-col gap-4 lg:w-2/4'>
                    <div>
                        <span className=' text-violet-600 font-semibold'>Special offer</span>
                        <h1 className='text-3xl font-bold'>{product.title}</h1>
                    </div>
                    <p className='text-gray-700'>
                    {product.description}</p>
                    <h6 className='text-2xl font-semibold'>${product.price}</h6>
                    <div className='flex flex-row items-center gap-12'>
                        <div className='flex flex-row items-center'>
                            <button onClick={() => setAmount((prev) => prev - 1)} className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl' >-</button>
                            <span className='py-4 px-6 rounded-lg'>{amount}</span>
                            <button onClick={() => setAmount((prev) => prev + 1)} className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl' >+</button>
                        </div>
                        <button onClick={() => handleAddToCartClick(product)} className='bg-secondary text-white font-semibold py-3 px-16 rounded-xl h-full'>
                        {clickedProductId === product.id ? 'Adding...' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default ProductDetailPage;
