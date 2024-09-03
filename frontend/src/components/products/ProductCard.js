import React from 'react'
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ data }) => {
  const navigate = useNavigate();

  const handelBuyNow = (id) => {
    navigate(`/product/${id}`);
  }



  return (
    <div className='mb-10'>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 place-items-center">
          {data.map((item) => (
            <div key={item.id} className="group border rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <img src={item.img} alt={item.name} className="h-[180px] w-[260px] object-cover rounded-md"/>

                <div className='hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full text-center groub-hover:backdrop-blur-sm justify-center items-center duration-200'>
                    <button onClick={handelBuyNow} className='bg-secondary text-3xl font-Poppins font-medium  text-white px-7 py-1 rounded-full'>Buy Now</button>
                </div>
              </div>
              <div className="leading-7">
                <h3 className="font-semibold text-lg text-text flex justify-start pl-2 pt-2">{item.name || 'Product Name'}</h3>
                <div className='flex gap-2 '>
                  <p className="font-semibold text-lg text-text flex justify-start pl-2 pt-2">{item.price}</p>
                  <h3 className="font-light text-m text-primaryBlackHover flex justify-start pl-2 pt-2 items-center line-through">{item.oldprice}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default ProductCard



// import React from 'react'

// const ProductCard = ({data}) => {
//   return (
//     <div>
//         <div>
//             {
//                 data.map((data) => {
//                     <div>
//                         <div className='h-12 flex'>
//                             <img src={data.img} alt={data.name} />
//                         </div>
//                     </div>
                    
//                 })
//             }
//         </div>
//     </div>
//   )
// }

// export default ProductCard