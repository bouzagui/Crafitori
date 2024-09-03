// CategoryList.js
import React, { useState, useEffect } from 'react';
import Category from './Category.js';
import axios from 'axios';
import CategoryT from '../Titells/CategoryT';
import Slider from 'react-slick';
import axiosInstance from '../../components/axios/axiosInstance'

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

  return (
    <div>
      <CategoryT />
      <div className='mt-9'>
        <Slider {...settings}>
          {categories.map((category) => (
            <Category
              key={category.id}
              name={category.name}
              image={category.image}
              url={category.url}
              subcategories={category.subcategories}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategoryList;