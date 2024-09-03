import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img_1 from '../../assets/category/img_1.jpg'
import img_2 from '../../assets/category/img_2.jpg'
import img_3 from '../../assets/category/img_3.jpg'
import img_4 from '../../assets/category/img_4.jpg'
import img_5 from '../../assets/category/img_5.jpg'
import img_6 from '../../assets/category/img_6.jpg'
import img_7 from '../../assets/category/img_7.jpg'
import CategoryT from '../Titells/CategoryT';

const categoryList = [
    {id: 1, name: `Basket Weaving`, img: img_1, url: '/category/1' },
    {id: 2, name: `Blacksmithing`, img: img_2, url: '/category/2' },
    {id: 3, name: `Carpet Weaving`, img: img_3, url: '/category/3' },
    {id: 4, name: `Copper Work`, img: img_4, url: '/category/4' },
    {id: 5, name: `Embroidery`, img: img_5, url: '/category/5' },
    {id: 6, name: `Jewelry Making`, img: img_6, url: '/category/6' },
    {id: 7, name: `Leatherwork`, img: img_7, url: '/category/7' }
];

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


const Category = () => {
    return (
        <div>
            <CategoryT />
            <div className='mt-9'>
                <Slider {...settings}>
                    {categoryList.map((d) => (
                        <div key={d.id} className='px-10 '>
                            <div className='bg-transparent h-[350px] text-primaryBlack rounded-xl flex flex-col justify-between'>
                                <div className='h-56 rounded-t-xl bg-transparent flex justify-center items-center'>
                                    <a href={d.url}><img src={d.img} alt={d.name} className='h-48 w-48 object-cover rounded-lg cursor-pointer'/></a>
                                </div>
                                <div className='flex flex-col justify-center items-center gap-4 p-4'>
                                    <h3 className='font-semibold text-l'>{d.name}</h3>
                                    <a href={d.url} className="w-full rounded-2xl bg-primaryBlack text-white font-semibold text-l text-center py-2 px-6 hover:bg-gray-200 hover:border-b-2 hover:border-gray-400 hover:text-primaryBlack transition-colors duration-300">Read More</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
      )
    }

export default Category