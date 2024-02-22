const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      fruit: "vegetable"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: "vegetable"
    }
  ],
  cart: []
};

const itemList = document.querySelector(".store--item-list");

const cartItemList = document.querySelector(".cart--item-list");

let sum = document.querySelector('#total-number')



function renderItems(filterType = null) {
  itemList.innerHTML = ""


  const filteredItems = filterType
  ? state.items.filter(item => item.type === filterType)
  : state.items;
  const length = state.items.length

  for(let i = 0; i < filteredItems.length; i++) {
    // Get the current task
    const item = filteredItems[i]
    // Create a <li></li> for the task
    const itemLi = document.createElement('li')
    itemLi.setAttribute('id', item.id)

    const image = document.createElement('img')
    image.className = 'item--img'
    image.src = "./assets/icons/"+item.id+".svg"
    image.alt = item.name
    image.width = 200
    image.height = 200
    
    // Add the checkbox to the task
    itemLi.appendChild(image)

    const itemName = document.createElement('span');
    itemName.textContent = item.name;
    itemLi.appendChild(itemName);

    const itemPrice = document.createElement('span');
    itemPrice.textContent = item.price;
    itemLi.appendChild(itemPrice);

    const addButton = document.createElement("button")
    addButton.textContent = "ADD TO CART"
    addButton.addEventListener("click", () => {

      const existingCartItem = state.cart.find(cartItem => cartItem.id === item.id);

  if (existingCartItem) {
    
    existingCartItem.quantity += 1;
  } else {

    const cartItem = { ...item, quantity: 1 };
    state.cart.push(cartItem);
  }
      renderCartItems()
      updateTotal()
    })
    itemLi.appendChild(addButton)

    // Add the list element to the taskListUL
    itemList.appendChild(itemLi)
    
}

}

function renderCartItems() {
  cartItemList.innerHTML = ""



  const length = state.cart.length

  if(length >= 1) {

    for(let i = 0; i < length; i++) {
      const cartItemLi = document.createElement('li')
      const cart = state.cart[i]
      const image = document.createElement("img")
      image.classList.add("cart--item-icon")
      image.src = "./assets/icons/"+cart.id+".svg"
      image.alt = cart.name
      cartItemLi.appendChild(image)

      let cartItemName = document.createElement('p')
      cartItemName.textContent = cart.name
      cartItemLi.appendChild(cartItemName)

     // let cartItemPrice =  document.body.appendChild(filterBtn1);
 
    //  cartItemPrice.textContent = cart.price
     // cartItemLi.appendChild//(cartItemPrice)



 

      const addButton = document.createElement("button")
      addButton.className = "add-btn"
      addButton.textContent = "+"
      addButton.addEventListener("click", () => {
        cart.quantity += 1
        renderCartItems()
        updateTotal()
      })
      cartItemLi.appendChild(addButton)

      const quantityText = document.createElement("span")
      quantityText.className = "quantity-text"
      quantityText.textContent = cart.quantity
      cartItemLi.appendChild(quantityText)

      const removeButton = document.createElement("button")
      removeButton.className = "remove-btn"
      removeButton.textContent = "-"
      removeButton.addEventListener("click", () => {
        if (cart.quantity > 1) {
          cart.quantity -= 1;
        }
        else {
          state.cart = state.cart.filter(item => item.id !== cart.id)
        }
        renderCartItems()
        updateTotal()
      })

      cartItemLi.appendChild(removeButton)

      

      cartItemList.appendChild(cartItemLi)    

    }

  }


}

function updateTotal() {
  const total = state.cart.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0);
  sum.textContent = `£${total.toFixed(2)}`
}

function main() {

  let filterBtn1 = document.createElement("button")
  filterBtn1.className = "filterbuttons"
  filterBtn1.textContent = "Filter By Fruits"
  filterBtn1.addEventListener("click", () => renderItems("fruit"))

  let filterBtn2 = document.createElement("button")
  filterBtn2.textContent = "Filter By Vegetables"
  filterBtn2.className = "filterbuttons"
  filterBtn2.addEventListener("click", () => renderItems("vegetable"))

  let filterBtn3 = document.createElement("button")
  filterBtn3.textContent = "All"
  filterBtn3.className = "filterbuttons"
  filterBtn3.addEventListener("click", () => renderItems(null))

  const filterContainer = document.getElementById('filter-container')

  filterContainer.appendChild(filterBtn1)
  filterContainer.appendChild(filterBtn2)
  filterContainer.appendChild(filterBtn3)





  
  renderItems()
  console.log("Running.....")
}
main()