import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import Products from './Products';
import Cart from './Cart';
import './app.css';



const PAGE_PRODUCTS = 'products';
const PAGE_CART = 'cart';

function AppProduct() {

  const [ setError] = useState("")
  const { logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (sum, { quantity }) => sum + quantity,
      0
    );
  };

  return (
    <div className="App">
      <header>
        <button className="btn btn-secondary w-20 mt-3  text-center" style={{ color: "white" , marginRight: 10 , fontSize : 25 }} onClick={() => navigateTo(PAGE_CART)}>
          Go to Cart ({getCartTotal()})
        </button>

        <button className="btn btn-secondary w-20 mt-3  text-center" style={{ color: "white" , marginLeft: 10 , fontSize : 25 }} onClick={() => navigateTo(PAGE_PRODUCTS)}>
          View Products
        </button>

        <button className="btn btn-secondary w-20 mt-3  text-center" style={{ color: "white" , marginLeft: 10 , fontSize : 25 }} onClick={handleLogout}>
         Log Out
        </button>

      </header>
      {page === PAGE_PRODUCTS && (
        <Products cart={cart} setCart={setCart} />
      )}
      {page === PAGE_CART && (
        <Cart cart={cart} setCart={setCart} />
      )}
    </div>
  );
}

export default AppProduct;
