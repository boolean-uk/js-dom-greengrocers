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


function listItems(){
  for (let i = 0; i < state.items.length; i++) {
const item = state.items[i];
const header = document.querySelector("#store")
const ul = document.querySelector('.item-list')
console.log(ul)
const li = document.createElement('li')
ul.append(li)


// creating div to insert inside li

const div = document.createElement("div")
div.setAttribute("class", "store--item-icon")
li.append(div)

const img = document.createElement('img')
img.setAttribute('src',`assets/icons/${item.id}.svg`)
div.append(img)

const button = document.createElement("button")
button.innerText = "add to cart"
li.append(button)

// add event listener

button.addEventListener("click", function() {
  addToCart(item);
});
}
}

listItems()

// adding an item to cart



// update items to cart

const main = document.querySelector("#cart")
const divCartItem = document.querySelector(".cart--item-list-container")
const ulCartItem = document.querySelector('.item-list')
console.log(ulCartItem)
const liCartItem = document.createElement('li')

ulCartItem.append(liCartItem)



