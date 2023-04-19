import { createContext, useContext, useEffect, useState } from "react";

let CartContext = createContext();

let CartProvider = ({ children }) => {
  let [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCart = JSON.parse(localStorage.getItem("cart"));
    if (existingCart) setCart(existingCart);
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

//customHooks
let useCart = () => useContext(CartContext);

export { CartProvider, useCart };
