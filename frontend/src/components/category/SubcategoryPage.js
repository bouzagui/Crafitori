import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axios/axiosInstance';
import Navbar from '../../components/navBar/Navbar';
import { Link } from 'react-router-dom';


const SubcategoryPage = () => {
  const { parentId } = useParams(); // Get the parent ID from the URL
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch subcategories based on the parent ID
    axiosInstance.get(`categories/subcategory/${parentId}/`)
      .then(response => {
        setSubcategories(response.data);
      })
      .catch(error => {
        setError('Failed to load subcategories');
        console.error('Error fetching subcategories:', error);
      });
  }, [parentId]);

  return (
    <div>
      <Navbar />
      <div className="lg:max-w-7xl md:max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 rounded-3xlxl md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subcategories.map((subcategory) => (
             <Link to={`/productsPage/${subcategory.id}`}>
                <div key={subcategory.id} className="bg-gray-100 p-4 rounded-xl shadow hover:shadow-xl transition-shadow cursor-pointer">
                  <h3 className="text-xl font-semibold mb-2">{subcategory.name}</h3>
                  <img src={subcategory.image} alt={subcategory.name} className="h-48 w-full object-cover rounded-xl cursor-pointer" />
                  {/* Add any additional info about the subcategory here */}
                </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryPage;
