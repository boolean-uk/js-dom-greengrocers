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
    let filteredItems = items;
    console.log("update");
    if (filterType === 1) {
        filteredItems = items.filter((i) => i.category === "green");
        console.log("greensfilter");
    } else if (filterType === 2) {
        filteredItems = items.filter((i) => i.category === "fruit");
        console.log("fruitsfilter");
    }
    return filteredItems.map((i) => createStoreItem(i));
};

const updateStoreItems = () => {
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
};

let filterType = 0;

updateStoreItems();

const storeFilter = document.querySelector(".store--filter");
const removeFilterButton = storeFilter.querySelector(".remove-filter-btn");
removeFilterButton.addEventListener("click", () => {
    filterType = 0;
    console.log("none");
    updateStoreItems();
});
const greensFilterButton = storeFilter.querySelector(".greens-filter-btn");
greensFilterButton.addEventListener("click", () => {
    filterType = 1;
    console.log("greens");
    updateStoreItems();
});
const fruitsFilterButton = storeFilter.querySelector(".fruits-filter-btn");
fruitsFilterButton.addEventListener("click", () => {
    filterType = 2;
    console.log("fruit");
    updateStoreItems();
});
