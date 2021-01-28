import React from "react";

export default function Cart({ cart, setCart }) {


  const getTotalSum = () => {
    return cart.reduce(
      (sum, { price, quantity }) => sum + price * quantity,
      0
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const setQuantity = (product, amount) => {
    const newCart = [...cart];
    newCart.find(
      (item) => item.name === product.name
    ).quantity = amount;
    setCart(newCart);
  };

  const removeFromCart = (productToRemove) => {
    setCart(
      cart.filter((product) => product !== productToRemove)
    );
  };

  return (
    <>
      <h1>Cart</h1>
      <div>Total Cost: ${getTotalSum()}</div>
      {cart.length > 0 && (
        <button className="btn btn-secondary mt-2" style={{ fontSize : 20}} onClick={clearCart}>Clear Cart</button>
        )}



      <div className="album py-5">
        <div className="container">
          <div className="row">
            {cart.map((product, idx) => (
              <div className="col-md-4">
                <div className=" mb-4 box-shadow">
                  <div className="product" key={idx}>
                    <img className="card-img-top" style={{ maxWidth: "200px" }} src={product.URL} alt={product.name} />
                    <h3 className="card-text">{product.name}</h3>
                    <h4 className="card-text">${product.price}</h4>
                    <input
                      value={product.quantity}
                      style={{ maxWidth: "200px" , margin: "auto"}}
                      className="form-control"
                      onChange={(e) =>
                        setQuantity(
                          product,
                          parseInt(e.target.value)
                        )
                      }
                    />
                    <br/>
                    <button className="btn btn-danger mt-2" onClick={() => removeFromCart(product)}>
                      Remove
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
