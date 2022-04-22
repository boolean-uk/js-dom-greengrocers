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

const svgList = [
  "001-beetroot",
  "002-carrot",
  "003-apple",
  "004-apricot",
  "005-avocado",
  "006-bananas",
  "007-bell-pepper",
  "008-berry",
  "009-blueberry",
  "010-eggplant",
];

const itemList = document.querySelector(".store--item-list");
const cartList = document.querySelector(".cart--item-list");

function createShop() {
  svgList.forEach((el, index) => {
    let fruit = svgList[index];

    let item = `<li>
  <div class="store--item-icon">
    <img src="assets/icons/${fruit}.svg" alt=${fruit.slice(4)} />
  </div>
  <button id=${fruit} class='add-to-basket' >Add to cart</button>
  </li> 
  `;

    itemList.insertAdjacentHTML("beforeend", item);
  });
}
createShop();

const buttons = document.querySelectorAll(".add-to-basket");

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (!state.cart.includes(event.target.id)) {
      createBasket(event);
      state.cart.push(event.target.id);
    }
  });
});

function createBasket(event) {
  const fruit = event.target.id;
  let cartItem = `<li>
    <img
      class="cart--item-icon"
      src="assets/icons/${fruit}.svg"
      alt= '${fruit}'
    />
    <p>${fruit.slice(4)}</p>
    <button class="quantity-btn remove-btn center">-</button>
    <span class="quantity-text center">1</span>
    <button class="quantity-btn add-btn center">+</button>
  </li>`;
  cartList.insertAdjacentHTML("beforeend", cartItem);
}
