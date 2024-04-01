function Cart() {
	const parent = document.querySelector("#cart ul");
	parent.replaceChildren(...window.data.cart.map((el) => CartItem(el)));

	document.querySelector(".total-section .total-number").replaceChildren(
		document.createTextNode(`
            £${window.data.getTotalCartPrice()}`)
	);

	return parent;
}

function CartItem(item) {
	const el = document.createElement("li");

	el.innerHTML = `
        <img
            class="cart--item-icon"
            src="assets/icons/${item.id}.svg"
            alt="${item.name}"
        />
        <p>${item.name}</p>
        <button 
            class="quantity-btn remove-btn center"
            >-</button>
        <span class="quantity-text center">${item.quantity}</span>
        <button 
            class="quantity-btn add-btn center"
            >+</button>
    `;

	el.querySelector(".remove-btn").addEventListener("click", () => {
		window.data.removeFromCart(item.id);
	});
	el.querySelector(".add-btn").addEventListener("click", () => {
		window.data.addToCart(item.id);
	});
	return el;
}

window.data.cartElement = Cart;
