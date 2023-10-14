const state = {
    items: [
        {
            id: "001-beetroot",
            name: "beetroot",
            price: 0.35,
        },
        {
            id: "002-carrot",
            name: "carrot",
            price: 0.35,
        },
        {
            id: "003-apple",
            name: "apple",
            price: 0.35,
        },
        {
            id: "004-apricot",
            name: "apricot",
            price: 0.35,
        },
        {
            id: "005-avocado",
            name: "avocado",
            price: 0.35,
        },
        {
            id: "006-bananas",
            name: "bananas",
            price: 0.35,
        },
        {
            id: "007-bell-pepper",
            name: "bell pepper",
            price: 0.35,
        },
        {
            id: "008-berry",
            name: "berry",
            price: 0.35,
        },
        {
            id: "009-blueberry",
            name: "blueberry",
            price: 0.35,
        },
        {
            id: "010-eggplant",
            name: "eggplant",
            price: 0.35,
        },
    ],
    cart: [],
};

// Query Selectors //

const storeItemList = document.querySelector(".store--item-list");

// A function to clear items in the basket.              !!!DO YOU NEED THIS??!!......
function basketClear() {
    const cartContainer = document.querySelector(".cart--item-list");
    cartContainer.innerHTML = "";
}

// Create a function to populate header with list items of imgs and buttons.
function groceryItemsAvailable(value) {
    const li = createLi();

    const div = createDiv("store--item-icon");
    li.append(div);

    const img = createImg("assets/icons/" + value.id + ".svg", `${value.name}`);
    div.append(img);

    const button = createButton();
    button.innerText = "Add to cart";
    button.setAttribute("id", value.id);
    li.append(button);

    storeItemList.append(li);
}

// Loop through all items in state and make correct grocery item.
state.items.forEach((value) => {
    groceryItemsAvailable(value);
});

// Create all functions for creating types of elements inside header.
function createDiv(classe) {
    const div = document.createElement("div");
    div.classList.add(classe);
    return div;
}

function createLi() {
    const li = document.createElement("li");
    return li;
}

function createImg(src, alt) {
    const img = document.createElement("img");
    img.setAttribute("src", src);
    img.setAttribute("alt", alt);
    return img;
}

function createButton() {
    const button = document.createElement("button");
    return button;
}

// Call function to display items in header.

// Create a function that adds items to basket based on what button was clicked.

// Create a function that looks at list items in basket and adds all prices in the state in the basket

// Create a function with an eventListener that looks at quantity text and adds additional price data and displays it in total.
