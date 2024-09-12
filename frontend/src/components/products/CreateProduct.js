import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios/axiosInstance';
import Navbar from '../navBar/Navbar';

const TestCreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    subcategory_id: '',
    images: [],
  });

  // Fetch categories on component load
  useEffect(() => {
    axiosInstance.get('/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        setError('Failed to load categories');
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Fetch subcategories when a category is selected
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    // Fetch subcategories based on the selected category
    axiosInstance.get(`/categories/subcategory/${categoryId}/`)
      .then(response => {
        setSubcategories(response.data);
      })
      .catch(error => {
        setError('Failed to load subcategories');
        console.error('Error fetching subcategories:', error);
      });
  };

  // Handle input changes for text and select fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const { files } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      images: files, // Handle multiple image file inputs
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category_id', productData.subcategory_id);

    for (let i = 0; i < productData.images.length; i++) {
      formData.append('uploaded_images', productData.images[i]);
    }

    try {
      const response = await axiosInstance.post('/products/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Product created successfully!');
      console.log('Product created:', response.data);
      window.location.reload();
    } catch (error) {
      setError('Failed to create product');
      console.error('Error creating product:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Product</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-500 text-center">{message}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={productData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {subcategories.length > 0 && (
            <div>
              <label className="block text-gray-700 font-bold mb-2">Subcategory</label>
              <select
                name="subcategory_id"
                value={productData.subcategory_id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="">Select a Subcategory</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Images</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              required
              multiple
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestCreateProduct;






// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../axios/axiosInstance';
// import Navbar from '../navBar/Navbar';

// const CreateProduct = () => {
//   const [productData, setProductData] = useState({
//     title: '',
//     description: '',
//     price: '',
//     category_id: '', // Add category_id to the product data
//     images: [],
//   });
//   const [categories, setCategories] = useState([]); // To store categories fetched from API
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch categories from API to populate category options
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axiosInstance.get('/categories/');
//         setCategories(response.data); // Assuming the API returns an array of categories
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'images') {
//       setProductData((prevState) => ({
//         ...prevState,
//         images: files, // Handle multiple image file inputs
//       }));
//     } else {
//       setProductData((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage('');

//     const formData = new FormData();
//     formData.append('title', productData.title);
//     formData.append('description', productData.description);
//     formData.append('price', productData.price);
//     formData.append('category_id', productData.category_id); // Append the category ID

//     // Append each image file to the formData
//     for (let i = 0; i < productData.images.length; i++) {
//       formData.append('uploaded_images', productData.images[i]); // Use the correct key for images
//     }

//     try {
//       const response = await axiosInstance.post('/products/', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setMessage('Product created successfully!');
//       console.log('Product created:', response.data);
//     } catch (error) {
//       console.error('Error creating product:', error.response?.data || error.message);
//       setMessage('Failed to create product. Please check required fields.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center">Create New Product</h2>
//         <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-bold mb-2">Title:</label>
//             <input
//               type="text"
//               name="title"
//               value={productData.title}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-bold mb-2">Description:</label>
//             <textarea
//               name="description"
//               value={productData.description}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             ></textarea>
//           </div>
//           <div>
//             <label className="block text-gray-700 font-bold mb-2">Price:</label>
//             <input
//               type="number"
//               name="price"
//               value={productData.price}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-bold mb-2">Category:</label>
//             <select
//               name="category_id"
//               value={productData.category_id}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             >
//               <option value="">Select a category</option>
//               {categories.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-gray-700 font-bold mb-2">Images:</label>
//             <input
//               type="file"
//               name="images"
//               accept="image/*"
//               multiple
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none"
//           >
//             {isLoading ? 'Submitting...' : 'Create Product'}
//           </button>
//         </form>
//         {message && <p className="mt-4 text-center text-green-500">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default CreateProduct;





