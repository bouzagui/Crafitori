import React from 'react'
import ProductCard from './ProductCard'
import Product_1 from '../../assets/products/produt_1.jpg'
import Product_2 from '../../assets/products/produt_2.jpg'
import Product_3 from '../../assets/products/produt_3.jpg'
import Product_4 from '../../assets/products/produt_4.jpg'
import BestSelllingT from '../Titells/BestSelllingT'


const ProductData = [
  { id: 1, img: Product_1, name: `Product_1`, price: `$100.00`, oldprice: '$252.23', aosDekay: "0", url: `/product/1`},
  { id: 2, img: Product_2, name: `Product_2`, price: `$50.32`, oldprice: '$90.55', aosDekay: "200", url: `/product/2`},
  { id: 3, img: Product_3, name: `Product_3`, price: `$25.14`, oldprice: '$100.55', aosDekay: "400", url: `/product/3`},
  { id: 3, img: Product_4, name: `Product_4`, price: `$548.56`, oldprice: '$800.99', aosDekay: "400", url: `/product/4`},
  { id: 5, img: Product_1, name: `Product_5`, price: `$100.00`, oldprice: '$252.23', aosDekay: "0", url: `/product/5`},
  { id: 6, img: Product_2, name: `Product_6`, price: `$50.32`, oldprice: '$90.55', aosDekay: "200", url: `/product/6`},
  { id: 7, img: Product_3, name: `Product_7`, price: `$25.14`, oldprice: '$100.55', aosDekay: "400", url: `/product/7`},
  { id: 8, img: Product_4, name: `Product_8`, price: `$548.56`, oldprice: '$800.99', aosDekay: "400", url: `/product/8`}
]
const Products = () => {
  return (
    <div className='container'>
        <div>
            <BestSelllingT />
            <div className='mb-10'>
                <ProductCard data={ProductData}/>
            </div>

        </div>
    </div>
  )
}

export default Products