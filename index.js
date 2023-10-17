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

// First query Selectors //
const storeItemList = document.querySelector(".store--item-list");
const cartlist = document.querySelector(".cart--item-list");
const totalNumber = document.querySelector(".total-number");


function basketClear() {
    cartlist.innerHTML = "";
}

// Create a function to populate header with list items of imgs and buttons. DONE
function groceryItemsAvailable(value) {
    const li = createLi();

    const div = createDiv("store--item-icon");
    li.append(div);

    const img = createImg(
        "assets/icons/" + value.id + ".svg",
        `${value.name}`,
        ""
    );
    div.append(img);

    const button = createButton("Add to cart", "addButton");
    li.append(button);
    button.value = value.name;
    button.addEventListener("click", (event) => {
        const itemName = event.target.value;
        const foundCartItem = state.cart.find((name) => name.name === itemName);

        if (foundCartItem) {
            foundCartItem.quantity += 1;
        } else {
            state.cart.push({
                id: value.id,
                name: value.name,
                price: value.price,
                quantity: 1,
            });
        }
        renderCart();
    });

    storeItemList.append(li);
}

// Create a function that makes the cart items.
function createCartItem(value) {
    const li = createLi();

    const img = createImg(
        "assets/icons/" + value.id + ".svg",
        `${value.name}`,
        "cart--item-icon"
    );
    li.append(img);

    const p = createPTag(`${value.name}`);
    li.append(p);

    const buttonMinus = createButton("-", "quantity-btn remove-btn center");
    buttonMinus.addEventListener("click", (event) => {
        value.quantity--;
        calcTotal()
        remover();
        renderCart();
    });

    li.append(buttonMinus);

    const span = createSpan(`${value.quantity}`, "quantity-text center");
    li.append(span);

    const buttonPlus = createButton("+", "quantity-btn add-btn center");
    buttonPlus.addEventListener("click", (event) => {
        value.quantity += 1;
        calcTotal()
        renderCart();
    });

    li.append(buttonPlus);
   
    cartlist.append(li);
}

// Create all functions for creating types of elements inside header. They will be hoisted.
function createDiv(classe) {
    const div = document.createElement("div");
    div.classList.add(classe);
    return div;
}

function createLi() {
    const li = document.createElement("li");
    return li;
}

function createImg(src, alt, classe) {
    const img = document.createElement("img");
    img.setAttribute("src", src);
    img.setAttribute("alt", alt);
    img.setAttribute("classe", classe);
    return img;
}

function createButton(text, classe) {
    const button = document.createElement("button");
    button.innerText = text;
    button.setAttribute("class", classe);
    return button;
}

function createPTag(text) {
    const p = document.createElement("p");
    p.innerText = text;
    return p;
}

function createSpan(text, classe) {
    const span = document.createElement("span");
    span.innerText = text;
    span.setAttribute("class", classe);
    return span;
}


// Render functions
function renderHeader() {
    state.items.forEach((value) => {
        groceryItemsAvailable(value);
    });
}

function renderCart() {
    basketClear();
    state.cart.forEach((value) => {
        createCartItem(value);
    });
}

function render() {
    renderHeader();
    renderCart();
}

function remover() {
    state.cart.forEach((item) => {
        console.log(state.cart)
        if (item.quantity === 0){
            state.cart = state.cart.filter((item) => item.quantity > 0);
            // console.log("something is zero")
        }
    })
}

function calcTotal() {
    state.cart.forEach((item) => {
        let total = item.quantity * item.price
        console.log(item)
        console.log(total.toFixed(2))
        return total.toFixed(2)
    })
}

render();
