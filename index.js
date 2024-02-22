const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      img: "assets/icons/001-beetroot.svg",
      price: 0.35,
      quantity: 0
    },
    {
      id: "002-carrot",
      name: "carrot",
      img: "assets/icons/002-carrot.svg",
      price: 0.35,
      quantity: 0
    },
    {
      id: "003-apple",
      name: "apple",
      img: "assets/icons/003-apple.svg",
      price: 0.35,
      quantity: 0
    },
    {
      id: "004-apricot",
      name: "apricot",
      img: "assets/icons/004-apricot.svg",
      price: 0.35,
      quantity: 0
    },
    {
      id: "005-avocado",
      name: "avocado",
      img: "assets/icons/005-avocado.svg",
      price: 0.35,
      quantity: 0
    },
    {
      id: "006-bananas",
      name: "bananas",
      img: "assets/icons/006-bananas.svg",
      price: 0.35,
      quantity: 0
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      img: "assets/icons/007-bell-pepper.svg",
      price: 0.35,
      quantity: 0
    },
    {
      id: "008-berry",
      name: "berry",
      img: "assets/icons/008-berry.svg",
      price: 0.35,
      quantity: 0
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      img: "assets/icons/009-blueberry.svg",
      price: 0.35,
      quantity: 0
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      img: "assets/icons/010-eggplant.svg",
      price: 0.35,
      quantity: 0
    }
  ],
  cart: []
};

const storeListUL = document.querySelector(".item-list.store--item-list")
const cartListUL = document.querySelector(".item-list.cart--item-list")
const totalNumber = document.querySelector(".total-number")

function renderStore() {

  for(let i = 0; i < state.items.length; i++) {

    const storeLi = document.createElement('li')

    const storeDiv = document.createElement('div')

    storeDiv.setAttribute("class", "store--item-icon")

    const storeImg = document.createElement('img')
    storeImg.setAttribute("src", state.items[i].img)
    storeDiv.appendChild(storeImg)

    const storeButton = document.createElement('button')
    storeButton.innerText = "Add to cart"

    storeButton.addEventListener('click', () => {
      const item = state.items[i];
      const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 }); 
      }

      renderCart();  
      updateTotalPrice();
    })
    
    /* ATTEMPT AT EXTENSION EXERCISES

    const filterFruitButton = document.createElement('button')
    filterFruitButton.innerText = "Sort by fruit"

    filterFruitButton.addEventListener('click', () => {

    })

    const filterVegetableButton = document.createElement('button')
    filterVegetableButton.innerText = "Sort by vegetable"

    filterVegetableButton.addEventListener('click', () => {

    })

    const sortAlphaButton = document.createElement('button')
    sortAlphaButton.innerText = "Sort alphabetically"

    sortAlphaButton.addEventListener('click', () => {
      state.cart.sort()
    }) */

    
    storeLi.appendChild(storeDiv)
    storeLi.appendChild(storeImg)
    storeLi.appendChild(storeButton)

    //storeListUL.appendChild(filterFruitButton)
    //storeListUL.appendChild(filterVegetableButton)
    //storeListUL.appendChild(sortAlphaButton)
    storeListUL.appendChild(storeLi)

  }

}

function renderCart() {

  cartListUL.innerHTML = ""

  for(let i = 0; i < state.cart.length; i++) {

    const cartLi = document.createElement('li')

    const cartImg = document.createElement('img')

    cartImg.setAttribute("class", "cart--item-icon")
    cartImg.setAttribute("src", state.cart[i].img)
    cartImg.setAttribute("alt", state.cart[i].name)
    
    const cartP = document.createElement('p')
    cartP.innerText = state.cart[i].name;

    const cartButton1 = document.createElement('button')
    cartButton1.setAttribute("class", "quantity-btn remove-btn center")
    cartButton1.innerText = "-"

    const cartSpan = document.createElement('span')
    cartSpan.setAttribute("class", "quantity-text center")
    cartSpan.innerText = state.cart[i].quantity

    const cartButton2 = document.createElement('button')
    cartButton2.setAttribute("class", "quantity-btn remove-btn center")
    cartButton2.innerText = "+"


    cartLi.appendChild(cartImg)

    totalNumber.innerText = '£' + parseFloat(0).toFixed(2);

    cartLi.appendChild(cartP)
    cartLi.appendChild(cartButton1)
    cartLi.appendChild(cartSpan)
    cartLi.appendChild(cartButton2)

    cartListUL.appendChild(cartLi)

    cartButton1.addEventListener('click', () => {
      if (state.cart[i].quantity > 1) {
        state.cart[i].quantity -= 1;
      } else if (state.cart[i].quantity === 1) {
        state.cart.splice(i, 1); 
      }
    
      renderCart();
      updateTotalPrice();
      }
    )
  
    cartButton2.addEventListener('click', () => {
      cartSpan.innerText = state.cart[i].quantity += 1
  
      let currentTotal = parseFloat(totalNumber.innerText.replace('£', ''));
      totalNumber.innerText = '£' + (currentTotal + 0.35).toFixed(2);

      renderCart();
      updateTotalPrice();
    })

    


  }

  totalNumber.innerText = '£' + parseFloat(0).toFixed(2);

}

function updateTotalPrice() {
  let total = 0; // Initialize the total cost
  
  // Loop through each item in the cart using a for loop
  for (let i = 0; i < state.cart.length; i++) {
    total += state.cart[i].price * state.cart[i].quantity; // Add item's total cost to the running total
  }
  
  // Update the totalNumber element to display the total, formatted as currency
  totalNumber.innerText = '£' + total.toFixed(2);
}

function main() {
  renderStore()
  renderCart()
}

main()