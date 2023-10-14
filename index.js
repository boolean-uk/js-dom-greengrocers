const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      quantity: 0
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      quantity: 0
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      quantity: 0
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      quantity: 0
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      quantity: 0
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      quantity: 0
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      quantity: 0
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      quantity: 0
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      quantity: 0
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      quantity: 0
    }
  ],
  cart: []
};

//const for the product section
const productSection = document.querySelector(".store--item-list")
const cartSection = document.querySelector(".cart--item-list")
const totalSection = document.querySelector(".total-number")

const items = state.items;
const cart = state.cart;

//function to create the product cards
function createCard(){
  state.items.forEach(item => {
    // Create elements for the item cards
    const li = document.createElement('li');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const ATCButton = document.createElement('button');
    ATCButton.innerText = "Add to cart";

    img.src = `assets/icons/${item.id}.svg`;
    div.setAttribute('class', 'store--item-icon');
    div.append(img);

    //add functionality to ATC button
    ATCButton.addEventListener('click', () => {
      clearCart();
      item.quantity += 1;

      //check if item is already in cart
      const dupItem = cart.some(obj => {
        return obj.id === item.id;
      });

      dupItem ? createCart() : cart.push(item) , createCart();
      itemTotals();
    });
    // Add the item name and price to the card
    li.append(div, ATCButton);
    productSection.append(li);
  });
}
//function to clear cart
function clearCart(){
  cartSection.innerHTML = "";
}

//function to create the cart cards
function createCart(){
  state.items.forEach(item => {
    // Create elements for the cart cards
    const li = document.createElement('li');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const minusBtn = document.createElement('button');
    const span = document.createElement('span');
    const plusBtn = document.createElement('button');
    //add classes to image element
    img.classList.add('cart--item-icon');
    img.src = `assets/icons/${item.id}.svg`;
    img.alt = item.name;
    //add classes to buttons and span elements
    minusBtn.setAttribute('class', 'quantity-btn remove-btn center');
    span.setAttribute('class', 'quantity-text center');
    plusBtn.setAttribute('class', 'quantity-btn add-btn center');
    //adding text to buttons and spans
    p.innerText = item.name;
    minusBtn.innerText = "-";
    plusBtn.innerText = "+";
    span.innerText = item.quantity;

    //guard clause to check if item quantity is 0
    if(item.quantity === 0){
      return;
    }

    //add functionality to minus button to say when the button is clicked it will update the item quantity of the same item in the cart
    minusBtn.addEventListener('click', () => {
      clearCart();
      item.quantity -= 1;
      createCart();
      itemTotals();
    });
    //add functionality to plus button
    plusBtn.addEventListener('click', () => {
      clearCart();
      item.quantity += 1;
      createCart();
      itemTotals();
    });
    //adding elements to the li element
    li.append(img, p, minusBtn, span, plusBtn);
    cartSection.append(li);
  });
}
//function to calculate the total price of the items in the cart
function itemTotals(){
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });
  totalSection.innerText = total.toFixed(2);
}
createCard();
