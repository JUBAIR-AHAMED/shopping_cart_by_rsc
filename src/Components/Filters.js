import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import './styles.css'
import Rating from './Rating'
import { CartState } from '../context/Context'
const Filters = () => {
    const {proState: {byStock, byFastDelivery, sort, byRating, searchQuery}, proDispatch} = CartState()
console.log(byStock, byFastDelivery, sort, byRating, searchQuery)
  return (
    <div className='filters'>
        <span className='title'>Filter Products</span>
        <span>
            <Form.Check
                inline
                label="Ascending"
                name="group1"
                type="radio"
                id={`inline-1`}
                onChange={()=>proDispatch({
                    type: "SORT_BY_PRICE",
                    payload: "lowToHigh"
                })}
                checked={sort==="lowToHigh"?true:false}
                />
        </span>
        <span>
            <Form.Check
                inline
                label="Descending"
                name="group1"
                type="radio"
                id={`inline-2`}
                onChange={()=>proDispatch({
                    type: "SORT_BY_PRICE",
                    payload: "highToLow"
                })}
                checked={sort==="highToLow"?true:false}
                />
        </span>
        <span>
            <Form.Check
                inline
                label="Include Out of Stock"
                name="group2"
                type="checkbox"
                id={`inline-3`}
                onChange={()=>proDispatch({
                    type: "FILTER_BY_STOCK",
                })}
                checked={byStock}
                />
        </span>
        <span>
            <Form.Check
                inline
                label="Fast Delivery Only"
                name="group2"
                type="checkbox"
                id={`inline-4`}
                onChange={()=>proDispatch({
                    type: "FILTER_BY_DELIVERY",
                })}
                checked={byFastDelivery}
            />
        </span>
        <span style={{cursor: "pointer"}}>
            <label>Rating:</label>
            <Rating 
                rating={byRating} 
                onClick={(i)=>proDispatch({
                    type: "FILTER_BY_RATING",
                    payload: i+1
                })}
            />

        </span>
        <Button variant='light' 
        onClick={()=>proDispatch({
            type: "CLEAR_FILTERS",
        })}> 
        Clear Filters 
        </Button>
    </div>
  )
}

export default Filters