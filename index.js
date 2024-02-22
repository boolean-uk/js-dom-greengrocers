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

const createStore = (item) => 
{
  let itemName = item.name
  itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1)
  
  return `<li>
  <div class="store--item-icon">
    <img src="assets/icons/${item.id}.svg" alt="${itemName}" />
  </div>
  <button onclick="addItemToCart('${item.id}')">Add to cart</button>
</li>`
    
}
  
  const createAllStoreItems = (storeList) => {
      return storeList.map(p => createStore(p))
  }
  
  document.getElementsByClassName('item-list store--item-list')[0].innerHTML = createAllStoreItems(state.items).join('')

  const addItemToCart = (itemid) =>
  {

    let newItem = getItemById(itemid)

    if (state.cart.find(x => x.item.id === newItem.id) !== undefined)
    {
      state.cart.find(x => x.item.id === newItem.id).quantity = state.cart.find(x => x.item.id === newItem.id).quantity + 1
    }
    else
    {
      state.cart.push({item: newItem, quantity: 1})
    }

    console.log(state.cart)

    updateCartVisual()
  }

  const getItemById = (itemid) =>
  {
    return state.items.find(x => x.id === itemid)
  }

  const createAllCartItems = (cartList) => {
    return cartList.map(p => createCart(p))
}

const createCart = (item) =>
{
  let itemName = item.item.id.slice(4)
  itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1)

        return `<li>
    <img
      class="cart--item-icon"
      src="assets/icons/${item.item.id}.svg"
      alt="${itemName}"
    />
    <p>${itemName}</p>
    <button class="quantity-btn remove-btn center" onClick="decrementAmount('${item.item.id}')">-</button>
    <span class="quantity-text center">${item.quantity}</span>
    <button class="quantity-btn add-btn center" onClick="incrementAmount('${item.item.id}')">+</button>
  </li>`
}

const updateCartVisual = () =>
{
  ///TODO cart total
  document.getElementsByClassName('item-list cart--item-list')[0].innerHTML = createAllCartItems(state.cart).join('')

  document.getElementsByClassName('total-number')[0].innerHTML = calcCartTotal(state.cart)

}

const incrementAmount = (itemid) =>
{
  state.cart.find(x => x.item.id === itemid).quantity = state.cart.find(x => x.item.id === itemid).quantity + 1
  updateCartVisual()
}

const decrementAmount = (itemid) =>
{
  state.cart.find(x => x.item.id === itemid).quantity = state.cart.find(x => x.item.id === itemid).quantity - 1
  if (state.cart.find(x => x.item.id === itemid).quantity <= 0){
    state.cart = state.cart.filter(x => x.item.id !== itemid)
    }
  updateCartVisual()
}

const calcCartTotal = (cart) => 
{
  let sum = 0

  cart.forEach(element => {
    sum = sum + (element.item.price * element.quantity)
  });

  //console.log(sum)
  return `£${Math.round(sum * 100) / 100}`

}
