const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      quantity: 0
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      quantity: 0
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      quantity: 0
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      quantity: 0
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      quantity: 0
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      quantity: 0
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      quantity: 0
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      quantity: 0
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      quantity: 0
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      quantity: 0
    }
  ],
  cart: []
};

// SELECT EXISTING HTML ELEMENTS

 const grocers = document.querySelector('.store--item-list')
 const cart = document.querySelector('.cart--item-list')
 const totalSpan = document.querySelector(".total-number")






// RENDER FOR STORE ITEMS

function renderStoreItems () {
  grocers.innerHTML= ''

  state.items.forEach((item) => {
   const li = document.createElement('li')
   grocers.append(li)

     // create div
   const div= document.createElement('div')
   div.setAttribute('class', 'store--item-icon')
   li.append(div)

    //create img  inside div
   const img = document.createElement('img')
   img.src = `assets/icons/${item.id}.svg`
   img.alt = '${items.id}'
   div.append(img)

    //create button and listen to it
   const button = document.createElement('button')
   button.innerText= 'Add to cart';
   li.append(button)

   button.addEventListener('click', (event) => {
    addItem(item)
    renderCart()
    cartTotal()
   })
  });
}
//basket
function addItem(item) {
  if( state.cart.find((produce) => produce.name === item.name ) === undefined){
    item.quantity =1;
    state.cart.push(item)
    renderCart()
  } else {
    item.quantity++
    renderCart()
  }
}






// RENDER FOR CART
// Write a renderCart() function
function renderCart () {
  cart.innerHTML = " ";
  

  state.cart.forEach((item) => {

    //create Li
    const cartLi = document.createElement('li')
    cart.append(cartLi)

    //create image
    const cartImage =document.createElement('img')
     cartImage.setAttribute('class', 'cart--item-icon')
     cartImage.src = `assets/icons/${item.id}.svg`
     cartImage.alt = '${items.id}'
     cartLi.append(cartImage)

    //create item name
    const itemsName = document.createElement('p')
    itemsName.innerText = `${item.name}`
    cartLi.append(itemsName)

    //create buttons
    
    const decrementBtn = document.createElement('button')
    decrementBtn.setAttribute('class', 'quantity-btn remove-btn center')
    decrementBtn.innerText= '-'
    cartLi.append(decrementBtn)

    decrementBtn.addEventListener('click', (event)=> {
      item.quantity -=1

       if(item.quantity === 0) {
        const index = state.cart.indexOf(item)
        state.cart.splice(index,1)
       }
       renderCart()
       cartTotal()
    })

    const span = document.createElement('span')
    span.setAttribute('class', "quantity-text center")
    span.innerText= `${item.quantity}`
    cartLi.append(span)



    const incrementBtn= document.createElement('button')
    incrementBtn.setAttribute('class', 'quantity-btn add-btn center')
    incrementBtn.innerText= '+'
    cartLi.append(incrementBtn)

    incrementBtn.addEventListener('click', (event) => {
      item.quantity ++,
      renderCart()
      cartTotal()
    });

  });
}



// total
function cartTotal(){
  let total = 0
  state.cart.forEach((item)=>{
   const price= item.price
   const quantity = item.quantity
   const itemTotal = price * quantity
   total += itemTotal 

  })
  let totalPrice = total.toFixed(2)
  totalSpan.innerText = `£${total}`
}

// 3. call renderStoreItems() as soon as page loads
renderStoreItems();
cartTotal()
renderCart()












