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

const storeItemList = document.querySelector('.store--item-list')

// Create function for store items
function renderStore(items) {
  // Clear store-item--list
  storeItemList.innerHTML = ''

  // Create an li for each object in state.items
  items.forEach(item => {
    const li = document.createElement('li')
    // Create a div to contain the img with class 'store--item-icon'
    const div = document.createElement('div')
    div.setAttribute('class', 'store--item-icon')
    // Create food item img/svg for appending into the div
    const img = document.createElement('img')
    img.setAttribute('src', `assets/icons/${item.id}.svg`)
    img.setAttribute('alt', item.name)
    

    //Append everything to where it should be
    storeItemList.appendChild(li)
    li.appendChild(div)
    div.appendChild(img)
  })
  
  
  

  // Implement button into the li
  // Event Listener for when the button is clicked
    //pushes clicked item/object into state.cart

// function end
}

function renderCart() {
// Create function for cart
  // Clear cart--item-list-container

  // Create an li for each item/object in state.cart
  // Add the item/object img within the li
  // Create a p element within each li containing state.cart.name

  // Create minus button within the lis with class 'quantity-btn remove-btn center'
  
  // Create amount number display within lis with class 'quantity-text center'
  
  // Create plus button within lis with class 'quantity-btn add-btn center'

  // Event listener for when minus button is clicked
    // Minus one from the displayed amount

  // Event listener for when plus button is clicked
    // Add one to the displayed amount

// function end
}

function renderTotal() {
// Create function for displaying total

  // Create sum of the cart item price * cart item quantity
  // Append sum into span with class total-number

//function end
}