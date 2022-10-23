const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};
const shop = document.querySelector(".store--item-list");
const cart = document.querySelector(".cart--item-list");
state.items.forEach(item => {
  console.log("eachOne", item)
  const li = document.createElement("li")
  const div = document.createElement("div")
  div.setAttribute("class", "store--item-icon")
  const img = document.createElement("img")
  img.src = `assets/icons/${item.id}.svg`
  img.alt = `${item.name}`
  const addButton = document.createElement("button")
  addButton.innerText="add to cart"
  addButton.addEventListener("click", function (e){
    e.preventDefault();
    state.cart.push(item)
    console.log("what is that", state)
  })
  li.append(div, addButton)
  div.append(img)
  shop.append(li)
})
console.log("after method", state.items[4].name)
// const items = state.items
// console.log("shop is:", items[1].id)
// function fromShop (shopItem){
  // const li = document.createElement("li")
  // console.log("branch", li)
  // const div = document.createElement("div")
  // const img = `src="assets/icons/001-beetroot.svg"`

//   return li
// }
// fromShop()
function cartItem () {
  state.items.forEach(item => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute("class", "cart--item-icon")
    img.src = `assets/icons/${item.id}.svg`;
    img.alt = `${item.name}`;
    const p = document.createElement("p");
    p.innerText = `${item.name}`;
    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "quantity-btn remove-btn center");
    removeButton.innerText = "-";
    const span = document.createElement("span")
    span.innerText = "";
    const addButton = document.createElement("button")
    addButton.setAttribute("class", "quantity-btn add-btn center")
    addButton.innerText = "+";
    cart.append(li);
    li.append(img, p, removeButton, span, addButton)
    return li
  })
}
cartItem()