import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const addItem = item => {
		setCart([...cart, item]);
	};

	const removeItem = id => {
		console.log(id)
		setCart(cart.filter(item => item.id !== id));
	}

	return (
		<div className="App">

			<CartContext.Provider value={{ cart, removeItem }}>
				<Navigation cart={cart} />
				<Route path="/cart" component={ShoppingCart}/>
			</CartContext.Provider>

			<ProductContext.Provider value={{ products, addItem }}>
				<Route exact path="/" component={Products}/>
			</ProductContext.Provider>

		</div>
	);
}

export default App;
