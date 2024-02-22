const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      img: "assets/icons/001-beetroot.svg",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      img: "assets/icons/002-carrot.svg",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      img: "assets/icons/003-apple.svg",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      img: "assets/icons/004-apricot.svg",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      img: "assets/icons/005-avocado.svg",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "006-bananas",
      name: "bananas",
      img: "assets/icons/006-bananas.svg",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      img: "assets/icons/007-bell-pepper.svg",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      img: "assets/icons/008-berry.svg",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      img: "assets/icons/009-blueberry.svg",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      img: "assets/icons/010-eggplant.svg",
      price: 0.35,
      type: "vegetable"
    }
  ],
  cart: []
};

const storeListUL = document.querySelector(".item-list.store--item-list")
const cartListUL = document.querySelector(".item-list.cart--item-list")

function addToCart(item) {
  const cartItemIndex = state.cart.findIndex(cartItem => cartItem.id === item.id)

  if (cartItemIndex !== -1) {
    state.cart[cartItemIndex].quantity++
  } else {
    state.cart.push({ ...item, quantity: 1 })
  }

  renderCart()
  renderCartTotal()
}

function renderStore(filterType = null) {
  storeListUL.innerHTML = '';

  // Filter items based on the selected type
  const filteredItems = filterType ? state.items.filter(item => item.type === filterType) : state.items;

  // Render filtered items
  filteredItems.forEach(item => {
    const storeLi = document.createElement('li');
    const storeDiv = document.createElement('div');
    storeDiv.setAttribute('class', 'store--item-icon');
    const storeImg = document.createElement('img');
    storeImg.setAttribute('src', item.img);
    storeDiv.appendChild(storeImg);

    const storeButton = document.createElement('button');
    storeButton.innerText = 'Add to cart';
    storeButton.addEventListener('click', function() {
      addToCart(item);
    });

    storeLi.appendChild(storeDiv);
    storeLi.appendChild(storeButton);
    storeListUL.appendChild(storeLi);
  });
}

// Function to render filter buttons
function renderFilters() {
  let filterContainer = document.querySelector('.filter-container')

  if (!filterContainer) {
    filterContainer = document.createElement('div')
    filterContainer.classList.add('filter-container')
    // Append filter container to the storeListUL's parent (this will put the filter buttons below the store items)
    storeListUL.parentNode.appendChild(filterContainer)
  }

  filterContainer.innerHTML = '' // Clear existing content

  const filterTitle = document.createElement('h3')
  filterTitle.innerText = 'Filter by type:'
  filterTitle.style.marginBottom = '10px'
  filterContainer.appendChild(filterTitle)

  // Create filter buttons for each type and "Show All"
  const types = [...new Set(state.items.map(item => item.type))]
  types.push('All'); // Add "All" option
  types.forEach(type => {
    const filterButton = document.createElement('button')
    filterButton.innerText = type === 'All' ? type : type.charAt(0).toUpperCase() + type.slice(1); // Capitalize first letter
    filterButton.addEventListener('click', function() {
      renderStore(type === 'All' ? null : type); // Pass null to show all items
    })
    filterContainer.appendChild(filterButton)
  });

  filterContainer.style.textAlign = 'center'

  storeListUL.style.marginBottom = '30px'
}


function renderCart() {
  cartListUL.innerHTML = '';
  for (let i = 0; i < state.cart.length; i++) {
    const cartLi = document.createElement('li');
    const cartDiv = document.createElement('div');
    cartDiv.setAttribute('class', 'cart--item-icon');
    const cartImg = document.createElement('img');
    cartImg.setAttribute('src', state.cart[i].img);
    cartImg.setAttribute('alt', state.cart[i].name);
    cartDiv.appendChild(cartImg);

    const itemName = document.createElement('p');
    itemName.innerText = state.cart[i].name;

    const removeButton = document.createElement('button');
    removeButton.setAttribute('class', 'quantity-btn remove-btn center');
    removeButton.innerText = '-';

    const quantity = document.createElement('span');
    quantity.setAttribute('class', 'quantity-text center');
    quantity.innerText = state.cart[i].quantity.toString();

    const addButton = document.createElement('button');
    addButton.setAttribute('class', 'quantity-btn add-btn center');
    addButton.innerText = '+';

    removeButton.addEventListener('click', function() {
      decreaseQuantity(i);
    });

    addButton.addEventListener('click', function() {
      increaseQuantity(i);
    });

    cartLi.appendChild(cartDiv);
    cartLi.appendChild(itemName);
    cartLi.appendChild(removeButton);
    cartLi.appendChild(quantity);
    cartLi.appendChild(addButton);
    cartListUL.appendChild(cartLi);
  }
}

function renderCartTotal() {
  const total = state.cart.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)

  const totalContainer = document.querySelector('.total-number')
  totalContainer.innerText = '£' + total.toFixed(2)
}

function decreaseQuantity(index) {
  if (state.cart[index].quantity > 1) {
    state.cart[index].quantity--
    renderCart()
    renderCartTotal()
  } else {
    state.cart.splice(index, 1)
    renderCart()
    renderCartTotal()
  }
}

function increaseQuantity(index) {
  state.cart[index].quantity++
  renderCart()
  renderCartTotal()
}

function main() {
  renderStore()
  renderFilters()
  renderCart()
  renderCartTotal()
}

main()