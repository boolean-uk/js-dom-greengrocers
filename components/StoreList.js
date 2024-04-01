function StoreList() {
	const parent = document.querySelector("#store ul");
	parent.replaceChildren(...window.data.items.map((el) => StoreItem(el)));
	return parent;
}

function StoreItem(item = { id: "", name: "", price: 0 }) {
	const el = document.createElement("li");
	el.innerHTML = `
            <div class="store--item-icon">
                <img
                    src="assets/icons/${item.id}.svg"
                    alt="${item.name}"
                />
            </div>
            <button>Add to cart</button>
    `;

	el.querySelector("button").addEventListener("click", () => {
		window.data.addToCart(item.id);
	});

	return el;
}

window.data.storeElement = StoreList;
