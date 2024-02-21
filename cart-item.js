const createCartItem = (item) => {
    const toReturn = `
    <li class="cart--item" item-id="${item.id}">
        <img
            class="cart--item-icon"
            src="assets/icons/${item.id}.svg"
            alt="${item.name}"
        />
        <p>${item.name}</p>
        <button class="quantity-btn remove-btn center">-</button>
        <span class="quantity-text center">${item.quantity}</span>
        <button class="quantity-btn add-btn center">+</button>
    </li>`;

    return toReturn;
};

let shouldSortCartItems = false;

const createAllCartItems = (items) => {
    if (shouldSortCartItems) {
        const sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
        return sortedItems.map((i) => createCartItem(i));
    } else {
        return items.map((i) => createCartItem(i));
    }
};

const updateCartItems = () => {
    document.getElementsByClassName("cart--item-list")[0].innerHTML =
        createAllCartItems(state.cart).join("");

    const cartItems = document.querySelectorAll(".cart--item");

    cartItems.forEach((cartItem) => {
        const addButton = cartItem.querySelector(".add-btn");
        addButton.addEventListener("click", () => {
            const itemId = cartItem.getAttribute("item-id");
            let itemData;
            state.items.forEach((item) => {
                if (item.id === itemId) itemData = item;
            });
            addItemToCart(itemData);
        });
        const removeButton = cartItem.querySelector(".remove-btn");
        removeButton.addEventListener("click", () => {
            const itemId = cartItem.getAttribute("item-id");
            let itemData;
            state.items.forEach((item) => {
                if (item.id === itemId) itemData = item;
            });
            removeItemFromCart(itemData);
        });
    });
};

updateCartItems();

const addButton = document.querySelector(".sort-btn");
addButton.addEventListener("click", () => {
    shouldSortCartItems = !shouldSortCartItems;
    updateCartItems();
});
