const state = {
    items: [
        {
            id: "001-beetroot",
            name: "beetroot",
            price: 0.35,
            category: "green",
        },
        {
            id: "002-carrot",
            name: "carrot",
            price: 0.35,
            category: "green",
        },
        {
            id: "003-apple",
            name: "apple",
            price: 0.35,
            category: "fruit",
        },
        {
            id: "004-apricot",
            name: "apricot",
            price: 0.35,
            category: "fruit",
        },
        {
            id: "005-avocado",
            name: "avocado",
            price: 0.35,
            category: "green",
        },
        {
            id: "006-bananas",
            name: "bananas",
            price: 0.35,
            category: "fruit",
        },
        {
            id: "007-bell-pepper",
            name: "bell pepper",
            price: 0.35,
            category: "green",
        },
        {
            id: "008-berry",
            name: "berry",
            price: 0.35,
            category: "fruit",
        },
        {
            id: "009-blueberry",
            name: "blueberry",
            price: 0.35,
            category: "fruit",
        },
        {
            id: "010-eggplant",
            name: "eggplant",
            price: 0.35,
            category: "green",
        },
    ],
    cart: [
        {
            id: "010-eggplant",
            name: "eggplant",
            price: 0.35,
            category: "green",
            quantity: 2,
        },
        {
            id: "007-bell-pepper",
            name: "bell pepper",
            price: 0.35,
            category: "green",
            quantity: 5,
        },
    ],
};

const addItemToCart = (item) => {
    const itemIndex = state.cart.findIndex((i) => i.id === item.id);
    if (itemIndex === -1) {
        const toPush = item;
        toPush.quantity = 1;
        state.cart.push(toPush);
    } else {
        state.cart[itemIndex].quantity++;
    }
    updateCartItems();
    calculateTotal();
};

const removeItemFromCart = (item) => {
    const itemIndex = state.cart.findIndex((i) => i.id === item.id);
    if (itemIndex === -1) {
        console.log("Can't remove that dumbass!");
    } else {
        state.cart[itemIndex].quantity--;
        if (state.cart[itemIndex].quantity <= 0) {
            state.cart.splice(itemIndex, 1);
        }
    }
    updateCartItems();
    calculateTotal();
};

const calculateTotal = () => {
    let sum = 0.0;
    state.cart.forEach((item) => {
        sum += item.quantity * item.price;
    });
    document.getElementsByClassName(
        "total-number"
    )[0].innerHTML = `£${sum.toFixed(2)}`;
};

calculateTotal();
