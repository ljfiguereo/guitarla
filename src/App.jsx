import { useEffect, useState } from 'react'
import Guitar from './components/Guitar'
import Header from './components/Header'
import { db } from './data/db'

function App() {

  const initialCart = ()=>{
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  useEffect(()=> {
      localStorage.setItem('cart',JSON.stringify(cart));
  },[cart]);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  function addToCart(item) {
    const itemExist = cart.findIndex(x => x.id == item.id);
    if (itemExist >= 0) {
      if (cart[itemExist].quantity >= MAX_ITEMS) return;

      const updateCart = [...cart];
      updateCart[itemExist].quantity++;
      setCart(updateCart);
    } else {
      item.quantity = 1;
      setCart(prevCart => [...cart, item]);
    }
  }

  function removeItemFromCart(id) {
    setCart(prevCart => prevCart.filter(x => x.id !== id));
  }

  function increaseQuantity(id) {
    const newCart = cart.map(x => {
      if (x.id == id && x.quantity < MAX_ITEMS) {
        return {
          ...x,
          quantity: x.quantity + 1
        };
      }
      return x;
    });

    setCart(newCart);
  }

  function decreaseQuantity(id) {
    const newCart = cart.map(x => {
      if (x.id === id && x.quantity > MIN_ITEMS) {
        return {
          ...x,
          quantity: x.quantity - 1
        };
      }
      return x;
    })

    setCart(newCart);
  }

  function emptyCart() {
    setCart([]);
  }

  return (
    <>
      <Header removeItemFromCart={removeItemFromCart} cart={cart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        emptyCart={emptyCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map(guitar => (
            <Guitar addToCart={addToCart}
              key={guitar.id} guitar={guitar} />
          )
          )
          }
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
