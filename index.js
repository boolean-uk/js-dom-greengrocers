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

// Element selectors

const shopItemList = document.querySelector(".store--item-list");
const cartItemList = document.querySelector(".cart--item-list");
const totalPrice = document.querySelector('.total-number')

// Program Logic

function addItemToCart(item) {
  if (!state.cart.includes(item)) {
    item.quantity = 1;
    state.cart.push(item)
    UpdateTotal()
    // console.log(item.quantity)
  }  else {
    item.quantity++
    UpdateTotal()
  }
  // console.log(item.quantity)
  renderCart()  
}

// Rendering

function renderShop () {
  state.items.forEach((item) => {
    const li = document.createElement('li');
    
    const div = document.createElement('div');
    div.setAttribute("class", "store--item-icon");

    const img = document.createElement('img');
    img.src = 'assets/icons/' + item.id + '.svg';
    img.alt = item.name;
    
    const addToCart = document.createElement('button');
    addToCart.innerHTML = 'Add to cart'
    addToCart.addEventListener('click', () => addItemToCart(item))

    div.append(img);
    li.append(div);
    li.append(addToCart);

    shopItemList.append(li);


  })
}

function renderCart () {

  cartItemList.innerHTML = '';

  state.cart.forEach((item) => {
    if (item.quantity > 0) {
      const li = document.createElement('li');

      const img = document.createElement('img');
      img.setAttribute('class', 'cart--item-icon');
      img.src = 'assets/icons/' + item.id + '.svg';
      img.alt = item.name

      const text = document.createElement('p');
      text.innerHTML = item.name
      
      const removeButt = document.createElement('button');
      removeButt.setAttribute('class', 'remove-btn');
      removeButt.innerHTML = '-';
      removeButt.addEventListener('click', () => {
        item.quantity--
        renderCart()
        UpdateTotal()
      })

      const span = document.createElement('span');
      span.innerHTML = item.quantity;

      const addButt = document.createElement('button');
      addButt.setAttribute('class', 'add-btn');
      addButt.innerHTML = '+';
      addButt.addEventListener('click', () => {
        item.quantity++
        renderCart()
        UpdateTotal()
      })

      li.append(img);
      li.append(text);
      li.append(removeButt);
      li.append(span);
      li.append(addButt);
      cartItemList.append(li);
    }
  })
}

function UpdateTotal() {
  let total = 0
  state.cart.forEach((item) => {
    let cost = item.price * item.quantity
    total += cost
  })

  totalPrice.innerHTML = total

}




renderShop()

renderCart()