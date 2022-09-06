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

function render(){
  const storeItems = document.querySelector('.item-list')
  state.items.forEach(o => {
    const li = document.createElement('li')
    const div = document.createElement('div')
    const img = document.createElement('img')
    const button = document.createElement('button')

    div.className = 'store--item-icon'
    img.setAttribute('src', 'assets/icons/' + o.id +'.svg')
    button.innerText = 'Add to cart'
    
    storeItems.append(li)
    li.append(div, button)
    div.append(img)

    button.addEventListener('click', () => {
      if(state.cart.includes(o)){
        return false
      }
      state.cart.push(o)
      renderCart()
      console.log(state.cart)
    })
  })

}

render()

function renderCart(){
  const cartItemLi = document.querySelector('.cart--item-list')
  
  cartItemLi.innerHTML = ''

 
  state.cart.forEach(o => {
   
    const li = document.createElement('li')
    const img = document.createElement('img')
    const p = document.createElement('p')
    const removeBtn = document.createElement('button')
    const span = document.createElement('span')
    const addBtn = document.createElement('button')

    img.className = "cart--item-icon"
    img.setAttribute('src', 'assets/icons/' + o.id +'.svg')
    p.innerText = o.name
    removeBtn.className = "quantity-btn remove-btn center"
    removeBtn.innerText = '-'
    span.className = 'quantity-text center'
    span.innerHTML = '1'
    addBtn.className = "quantity-btn add-btn center"
    addBtn.innerText = '+'

    cartItemLi.append(li)
    li.append(img, p, removeBtn, span, addBtn)

   removeBtn.addEventListener('click', () => {
    span.innerHTML = -1
    if(span.innerHTML === 0){
      li[o].remove()
      console.log('remove button');
    }

    addBtn.addEventListener('click', () => {
      // span.innerHTML = +1
      console.log('plus button');

    })
   })

  })
}





