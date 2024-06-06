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
const items = state.items;
let id;
for (let i = 0; i < items.length; i++) {
  id = items[i].id;
console.log(items[i])
  storeListItems(id);
}

function storeListItems(id) {
  const storeUl = document.querySelector(".store--item-list");
  const storeLi = document.createElement("li");
  storeUl.appendChild(storeLi);
  const div = document.createElement("div");
  div.classList = "store--item-icon";
  const img = document.createElement("img");
  img.src = "assets/icons/" + id + ".svg";
  const button = document.createElement("button");
  button.textContent = "Add to cart";
  div.appendChild(img);
  storeLi.appendChild(div);
  storeLi.appendChild(button);

  button.addEventListener("click", () => {

    cartItems(id);
  });
}

function cartItems(id) {
  const mainUl = document.querySelector(".cart--item-list");
  const cartLi = document.createElement("li");
  mainUl.appendChild(cartLi);
  const img = document.createElement("img");
  img.classList = "cart--item-icon";
  img.src = "assets/icons/" + id + ".svg";
  img.alt = id;
  const paragraph = document.createElement("p");
  paragraph.textContent = id;
  const SubBtn = document.createElement("button");
  SubBtn.classList = "quantity-btn remove-btn center";
  SubBtn.textContent = "-";
  const span = document.createElement("span");
  span.classList = "quantity-text center";
  span.textContent = "1";
  const addBtn = document.createElement("button");
  addBtn.classList = "quantity-btn add-btn center";
  addBtn.textContent = "+";
  cartLi.append(img, paragraph, SubBtn, span, addBtn);

}
