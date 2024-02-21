const createStoreItem = (item) => {
    const toReturn = `
    <li class="store--item" item-id="${item.id}">
        <div class="store--item-icon">
            <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
        </div>
        <button class="store--item-button">Add to cart</button>
    </li>`;

    return toReturn;
};

const createAllStoreItems = (items) => {
    return items.map((i) => createStoreItem(i));
};

document.getElementsByClassName("store--item-list")[0].innerHTML =
    createAllStoreItems(state.items).join("");

const storeItems = document.querySelectorAll(".store--item");

storeItems.forEach((storeItem) => {
    const button = storeItem.querySelector(".store--item-button");
    button.addEventListener("click", () => {
        const itemId = storeItem.getAttribute("item-id");
        let itemData;
        state.items.forEach((item) => {
            if (item.id === itemId) itemData = item;
        });
        addItemToCart(itemData);
    });
});
