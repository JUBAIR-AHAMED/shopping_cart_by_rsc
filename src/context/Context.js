import { faker } from '@faker-js/faker'
import {React, createContext, useContext, useReducer} from 'react'
import { cartReducer, proReducer } from './Reducers';

const Cart = createContext()

faker.seed(20)

//Context API
const Context = ({children}) => {
  // console.log(children)
  //to get a random number
  function getRandomNumber(min, max) {
    const randomDecimal = Math.random();
    const scaledNumber = randomDecimal * (max - min + 1);
    const randomInteger = Math.floor(scaledNumber);
    return randomInteger;
  }

  //to generate fake data for testing
  const products= [...Array(20)].map(()=>({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price().split('.')[0],
    image: faker.image.url(200, 200, 'animals', false),
    inStock: getRandomNumber(0,5),
    fastDelivery: faker.datatype.boolean(),
    ratings:  getRandomNumber(0,5),
  }))

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  })
  
  const [proState, proDispatch] = useReducer(proReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  })
  // logging the fake products
  // console.log(products)

  return (
    <Cart.Provider value={{state, dispatch, proState, proDispatch}}>
      {children}
    </Cart.Provider>
  )
}

export default Context

export const CartState = () =>{
  return useContext(Cart)
}