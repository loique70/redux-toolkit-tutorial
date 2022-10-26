import React from 'react'
import { useDispatch } from 'react-redux'
import { revomeItem, increseItem, decreseItem } from '../features/cart/cartSlice'
import { ChevronDown, ChevronUp } from '../icons'

const CartItems = ({id, img, title, price, amount}) => {
  const dispatch = useDispatch()
  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        <button className='remove-btn' onClick={() => dispatch(revomeItem(id))}>remove</button>
      </div>
      <div>
        <button className='amount-btn' onClick={() => dispatch(increseItem({id}))}>
          <ChevronUp/>
        </button>
        <p className='amount'>{amount}</p>
        <button className='amount-btn' onClick={() => {
          if(amount === 1) {dispatch(revomeItem(id)) 
           return
          } 
          dispatch(decreseItem({id}))}}>
          <ChevronDown/>
        </button>
      </div>
    </article>
  )
}

export default CartItems
