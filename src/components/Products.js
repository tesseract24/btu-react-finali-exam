import React, { useState, useEffect } from "react";
import {db} from "../firebase";
import { Form } from 'react-bootstrap';


const Category1 = 'Category 1';
const Category2 = 'Category 2';
const Category3 = 'Category 3';

export default function Products({ setCart, cart }) {

  // const singlePage = (product) => {
  //   let newCart = [...cart];
  //   let itemInCart = newCart.find(
  //     (item) => product.name === item.name
  //   );
  //     newCart.push(itemInCart);
  //   setCart(newCart);
  // };



  const addToCart = (product) => {
    let newCart = [...cart];
    let itemInCart = newCart.find(
      (item) => product.name === item.name
    );
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart);
  };

  const [category, setCategory] = useState(Category1);

  const [products , setProducts] = useState([])
  const [loading , setLoading] = useState(false)

  const ref = db.collection('product');

  function getProducts() {
      setLoading(true)
      ref.onSnapshot((querySnapshot) => {
          const items = []
          querySnapshot.forEach((doc) => {
              items.push(doc.data())
          })
          setProducts(items)
          setLoading(false)
      })
  }

  useEffect(() => {
      getProducts()
  } , [] )



  const getProductsInCategory = () => {
    return products.filter(
      product => product.category === category
      );
  };



  if (loading) {
    return <h1>Loading...</h1>
  }



  return (
    <>
      <h1>Products</h1>
      <p>Select a category</p>
      <Form.Control
        as="select"
        className="btn btn-secondary dropdown-toggle"
        id="inlineFormCustomSelect"
        custom
        onChange={(e) => setCategory(e.target.value)}>
        <option value={Category1}>{Category1}</option>
        <option value={Category2}>{Category2}</option>
        <option value={Category3}>{Category3}</option>
      </Form.Control>



      <div className="album py-5">
        <div className="container">
          <div className="row">

              {getProductsInCategory().map((product, idx) => (
                <div className="col-md-4">
                  <div className=" mb-4 box-shadow">
                    <div className="product" key={idx}>
                      <img  className="card-img-top" style={{ maxWidth: "200px" }} src={product.URL} alt={product.name} />
                      <h3 className="card-text">{product.name}</h3>
                      <h4 className="card-text">${product.price}</h4>
                      {/* <button  className="btn btn-secondary"onClick={() => singlePage(product)}>
                        see more
                      </button> */}
                      <br/>
                      <br/>
                      <button  className="btn btn-secondary"onClick={() => addToCart(product)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}

          </div>
        </div>
      </div>
    </>
  );
}