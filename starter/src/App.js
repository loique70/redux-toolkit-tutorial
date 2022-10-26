import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./component/CartContainer";
import Modal from "./component/Modal";
import Navbar from "./component/Navbar";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";

function App() {

  const {cartItems, isLoading} = useSelector(store => store.cart)
  const {isOpen} = useSelector(store => store.modal)

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])
  
  useEffect( () => { 
    dispatch(getCartItems())
  }, [])

  if(isLoading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    )
  }

  return (
  <main>
    {isOpen && <Modal/>}
   <Navbar/>
   <CartContainer/>
  </main>
  )
}
export default App;
