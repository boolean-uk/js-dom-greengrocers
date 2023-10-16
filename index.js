const state = {
    items: [
        {
            id: "001-beetroot",
            name: "beetroot",
            price: 0.4,
            type: "vegetables",
        },
        {
            id: "002-carrot",
            name: "carrot",
            price: 0.99,
            type: "vegetables",
        },
        {
            id: "003-apple",
            name: "apple",
            price: 0.55,
            type: "fruits",
        },
        {
            id: "004-apricot",
            name: "apricot",
            price: 0.39,
            type: "fruits",
        },
        {
            id: "005-avocado",
            name: "avocado",
            price: 1,
            type: "fruits",
        },
        {
            id: "006-bananas",
            name: "bananas",
            price: 0.9,
            type: "fruits",
        },
        {
            id: "007-bell-pepper",
            name: "bell pepper",
            price: 0.35,
            type: "vegetables",
        },
        {
            id: "008-berry",
            name: "berry",
            price: 0.95,
            type: "fruits",
        },
        {
            id: "009-blueberry",
            name: "blueberry",
            price: 1.45,
            type: "fruits",
        },
        {
            id: "010-eggplant",
            name: "eggplant",
            price: 0.15,
            type: "vegetables",
        },
    ],
    cart: [],
};

// Imports

const storeItems = document.querySelector(".store--item-list");
const cartItems = document.querySelector(".cart--item-list");
const totalNumber = document.querySelector(".total-number");

// Logic

// Render functions

const renderStore = (filter, sort) => {
    storeItems.querySelectorAll("li").forEach((item) => item.remove());

    state.items
        .filter((item) => (filter ? item.type === filter : item))
        .sort(
            (a, b) =>
                sort && a[sort].toString().localeCompare(b[sort].toString())
        )
        .forEach((item) => {
            const itemContainer = document.createElement("li");

            const itemName = document.createElement("p");
            itemName.innerText = item.name;

            const itemDiv = document.createElement("div");
            itemDiv.setAttribute("class", "store--item-icon");

            const itemImage = document.createElement("img");
            itemImage.src = `assets/icons/${item.id}.svg`;
            itemImage.alt = item.name;

            const itemPrice = document.createElement("span");
            itemPrice.innerText = `£${item.price}`;

            const itemButton = document.createElement("button");
            itemButton.innerText = "Add to cart";

            itemButton.addEventListener("click", () => {
                const itemInCart = state.cart.find(
                    (cartItem) => cartItem.id === item.id
                );

                itemInCart
                    ? ++itemInCart.count
                    : state.cart.push({ ...item, count: 1 });

                renderCart();
            });

            // configuration
            itemDiv.append(itemImage);
            itemContainer.append(itemName, itemDiv, itemPrice, itemButton);
            storeItems.append(itemContainer);
        });
};

const renderCart = () => {
    cartItems.querySelectorAll("li").forEach((item) => item.remove());

    state.cart.forEach((item) => {
        const itemContainer = document.createElement("li");

        const itemImage = document.createElement("img");
        itemImage.setAttribute("class", "cart--item-icon");
        itemImage.src = `assets/icons/${item.id}.svg`;
        itemImage.alt = item.name;

        const itemName = document.createElement("p");
        itemName.innerText = item.name;

        const itemRemoveButton = document.createElement("button");
        itemRemoveButton.setAttribute(
            "class",
            "quantity-btn remove-btn center"
        );
        itemRemoveButton.innerText = "-";
        itemRemoveButton.addEventListener("click", () => {
            const itemInCart = state.cart.find(
                (cartItem) => cartItem.id === item.id
            );

            itemInCart.count > 1
                ? --itemInCart.count
                : (state.cart = state.cart.filter(
                      (cartItem) => cartItem.id !== item.id
                  ));

            renderCart();
        });

        const itemCounter = document.createElement("span");
        itemCounter.setAttribute("class", "quantity-text center");
        itemCounter.innerText = item.count;

        const itemAddButton = document.createElement("button");
        itemAddButton.setAttribute("class", "quantity-btn add-btn center");
        itemAddButton.innerText = "+";
        itemAddButton.addEventListener("click", () => {
            const itemInCart = state.cart.find(
                (cartItem) => cartItem.id === item.id
            );

            ++itemInCart.count;

            renderCart();
        });

        // configuration
        itemContainer.append(
            itemImage,
            itemName,
            itemRemoveButton,
            itemCounter,
            itemAddButton
        );
        cartItems.append(itemContainer);
    });

    totalNumber.innerText = `£${state.cart
        .map((item) => item.price * item.count)
        .reduce((a, b) => a + b, 0)
        .toFixed(2)}`;
};

// filter and sort functions
const storeTools = document.querySelectorAll(".store-tools > select");
const filterSelector = document.querySelector("#store-fitler");
const sortSelector = document.querySelector("#store-sort");

storeTools.forEach((item) => {
    item.addEventListener("change", () => {
        renderStore(filterSelector.value, sortSelector.value);
    });
});

// Calling functions
renderStore();
