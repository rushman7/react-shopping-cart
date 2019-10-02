import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const localData = () => JSON.parse(window.localStorage.getItem('CartStorage')) || []
	const [products] = useState(data);
	const [cart, setCart] = useState(localData);

	useEffect(() => {
		window.localStorage.setItem('CartStorage', JSON.stringify(cart))
	}, [cart])

	const addItem = item => {
		if (![...cart].includes(item)) {
			setCart([...cart, item])
		} else {
			alert('You already have this book in your cart!')
		}
	};

	const removeItem = id => {
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
