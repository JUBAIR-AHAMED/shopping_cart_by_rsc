import React from 'react'
import './styles.css'
import { Button, Card } from 'react-bootstrap'
import Rating from './Rating'
import { CartState } from '../context/Context'
const SingleProduct = ({value}) => {
  const {state: {cart}, dispatch} = CartState()

  return (
    <div className='products'>
        <Card>
          <Card.Img variant="top" src={value.image} />
          <Card.Body>
            <Card.Title>{value.name}</Card.Title>
            <Card.Subtitle>
              <span>Rs. {parseInt(value.price)}</span>
              {value.fastDelivery ? <div>Fast Delivery</div> : <div>4 days minimum</div>}
              <Rating rating={value.ratings} onClick={()=>(null)}/>
            </Card.Subtitle>
            {cart.some(p=>p.id===value.id)?   
              (<Button
                onClick={()=>(dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: value,
                }))} 
                variant="danger">Remove From Cart</Button>):
            (<Button
              onClick={()=>{dispatch({
                type: "ADD_TO_CART",
                payload: value,
              })}} 
            disabled={!value.inStock}>
              {value.inStock ? "Add To Cart": "Out of stock"}
              </Button>)
            }
          </Card.Body>
        </Card>
    </div>
  )
}

export default SingleProduct