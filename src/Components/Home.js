import React from 'react'
import { CartState } from '../context/Context'
import SingleProduct from './SingleProduct'
import './styles.css'
import Filters from './Filters'
const Home = () => {
  const { state: {products}, proState: {byStock, byFastDelivery, sort, byRating, searchQuery}, proDispatch } = CartState()

  const transformProducts = () => {
    let sortedProducts = products;
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
      )
    }
    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock)
    }
    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery)
    }
    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) => prod.ratings >= byRating)
    }
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) => prod.name.toLowerCase().includes(searchQuery))
    }
    return sortedProducts
  } 
  // console.log(products)
  return (
    <div className='home'>
    <Filters />
    <div className="productContainer">
      {
        transformProducts().map((prod)=>{
          return <SingleProduct value={prod} key={prod.id}></SingleProduct>
      })
      }
    </div>
    </div>
  )
}

export default Home