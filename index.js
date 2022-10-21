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

function addStoreItems() {
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.setAttribute("class", "store--item-icon");
  const img = document.createElement("img");
  img.innerHTML = 'src="assets/icons/001-beetroot.svg" alt="beetroot"';
  const addToCartButton = document.createElement("button");
  addToCartButton.innerText = "ADD TO CART";
  li.appendChild(div);
  div.appendChild(img);
  li.appendChild(addToCartButton);
  storeItems.appendChild(li);
}
const storeItems = document.querySelector(".item-list");
function render() {
  state.items.forEach((item) => {
    const li = addStoreItems(item);
    addStoreItems();
  });
}
render();
