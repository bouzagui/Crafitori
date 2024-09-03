import React from 'react';

const Category = ({ name, image, url, subcategories }) => {
  return (
    <div className='px-10'>
      <div className='bg-transparent h-[350px] text-primaryBlack rounded-xl flex flex-col justify-between'>
        <div className='h-56 rounded-t-xl bg-transparent flex justify-center items-center'>
          <a href={url}>
            <img
              src={image}
              alt={name}
              className='h-48 w-48 object-cover rounded-lg cursor-pointer'
            />
          </a>
        </div>
        <div className='flex flex-col justify-center items-center gap-4 p-4'>
          <h3 className='font-semibold text-l'>{name}</h3>
          <a
            href={url}
            className="w-full rounded-2xl bg-primaryBlack text-white font-semibold text-l text-center py-2 px-6 hover:bg-gray-200 hover:border-b-2 hover:border-gray-400 hover:text-primaryBlack transition-colors duration-300"
          >
            Read More
          </a>
          {/* Render subcategories here */}
          {subcategories.map((subcategory) => (
            <div key={subcategory.id}>
              <a href={subcategory.url} className="text-primaryBlackHover hover:underline">
                {subcategory.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
