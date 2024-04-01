const cart = [];

//Handlers
const addToCart = (id) => {
	const cartItem = cart.find((el) => el.id === id);

	if (cartItem) {
		cartItem.quantity++;
	} else {
		//get item data
		const item = window.data.items.find((el) => el.id === id);
		if (!item) return;
		//
		const newCartItem = { ...item, quantity: 1 };
		cart.push(newCartItem);
	}

	window.data.cartElement();
};

const removeFromCart = (id) => {
	const i = cart.findIndex((el) => el.id === id);

	if (i < 0) return; //error
	if (cart[i].quantity > 1) {
		cart[i].quantity--;
	} else {
		cart.splice(i, 1);
	}

	window.data.cartElement();
};

const getTotalCartPrice = () =>
	cart.reduce((sum, el) => sum + el.price * el.quantity, 0).toFixed(2);

window.data.cart = cart;
window.data.addToCart = addToCart;
window.data.removeFromCart = removeFromCart;
window.data.getTotalCartPrice = getTotalCartPrice;
