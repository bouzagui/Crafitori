import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryT from '../Titells/CategoryT';
import axiosInstance from '../axios/axiosInstance';
import { Link } from 'react-router-dom';

// const CategorySlide = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     axiosInstance.get('categories/')
//       .then(response => {
//         setCategories(response.data.filter(category => category.parent === null));
//       })
//       .catch(error => {
//         console.error('Error fetching categories:', error);
//       });
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     responsive: [
//         {
//             breakpoint: 1024,
//             settings: {
//                 slidesToShow: 3,
//                 slidesToScroll: 1,
//             }
//         },
//         {
//             breakpoint: 600,
//             settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 1
//             }
//         }
//     ]
// };


const CategorySlide = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from the API
        axiosInstance.get('categories/') // Replace with your actual API endpoint
            .then(response => {
                setCategories(response.data.filter(category => category.parent === null));
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    return (
        <div>
            <CategoryT />
            <div className='mt-9'>
                <Slider {...settings}>
                    {categories.map((category)  => (
                        <div key={category.id} className='px-10 '>
                            <div className='bg-secondary h-[350px] text-primaryBlack rounded-xl flex flex-col justify-between '>
                                <div className='h-56 rounded-t-xl bg-primary flex justify-center items-center'>
                                    <Link to={`/subcategory/${category.id}`}>
                                        <img src={category.image} alt={category.name} className="h-48 w-48 object-cover rounded-full border-4 border-primaryBlack cursor-pointer" />
                                    </Link>
                                </div>
                                <div className='flex flex-col justify-center items-center gap-4 p-4'>
                                    <h3 className='font-semibold text-l'>{category.name}</h3>
                                    <Link to={`/subcategory/${category.id}`} className="w-full rounded-2xl bg-primaryBlack text-white font-semibold text-l text-center py-2 hover:bg-gray-200 hover:border-b-2 hover:border-gray-400 hover:text-primaryBlack transition-all duration-300">Read More</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
      )


}

export default CategorySlide;
//     nextArrow: null,
//     responsive: [
//       {
//         breakpoint: 1536,
//         settings: {
//           slidesToShow: 6,
//           centerMode: true,
//         }
//       },
//       {
//         breakpoint: 1280,
//         settings: {
//           slidesToShow: 4,
//           centerMode: true,
//         }
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           centerMode: true,
//         }
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           centerMode: true,
//         }
//       },
//       {
//         breakpoint: 640,
//         settings: {
//           slidesToShow: 1,
//           centerMode: true,
//         }
//       }
//     ]
//   };

//   return (
//     <div className="w-full overflow-hidden m-auto">
//       <div className="px-4 sm:px-4 md:px-6 lg:px-8">
//         <CategoryT />
//       </div>
//       <div className="mt-9">
//         <Slider {...settings}>
//           {categories.map((category) => (
//             <div key={category.id} className="px-2 sm:px-4 md:px-6 lg:px-8">
//               <div className="bg-secondary h-[350px] text-primaryBlack rounded-xl flex flex-col justify-between mx-auto sm:mx-0 max-w-[280px] sm:max-w-none">
//                 <div className="h-56 rounded-t-xl bg-primary flex justify-center items-center">
//                   <Link to={`/subcategory/${category.id}`}>
//                     <img 
//                       src={category.image} 
//                       alt={category.name} 
//                       className="h-40 w-40 sm:h-48 sm:w-48 object-cover rounded-full border-4 border-primaryBlack cursor-pointer"
//                     />
//                   </Link>
//                 </div>
//                 <div className="flex flex-col justify-center items-center gap-4 p-4">
//                   <h3 className="font-semibold text-base sm:text-lg text-center">{category.name}</h3>
//                   <Link 
//                     to={`/subcategory/${category.id}`} 
//                     className="w-full rounded-2xl bg-primaryBlack text-white font-semibold text-sm sm:text-base text-center py-2 hover:bg-gray-200 hover:border-b-2 hover:border-gray-400 hover:text-primaryBlack transition-all duration-300"
//                   >
//                     Read More
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default CategorySlide;
// >>>>>>> 37d074c8dd3e05c499535927240d1e9e16302484
