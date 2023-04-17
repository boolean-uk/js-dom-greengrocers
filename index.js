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

// rendering store items
const storeUl = document.querySelector('.store--item-list')
const cartUl = document.querySelector('.cart--item-list')
console.log(cartUl)



function renderAllStoreItems(){
  for(let i = 0; i < state.items.length; i++){
    const storeLi = document.createElement('li')
    storeUl.appendChild(storeLi)
    
    const storeLiIconDiv = document.createElement('div')
    storeLiIconDiv.setAttribute('class', 'store--item-icon')
    storeLi.appendChild(storeLiIconDiv)
    
    const storeLiImg = document.createElement('img')
    storeLiImg.setAttribute('src', `assets/icons/${state.items[i].id}.svg`)
    storeLiImg.setAttribute('alt', `${state.items[i].name}`)
    storeLiIconDiv.appendChild(storeLiImg)
    
    const storeLiBtn = document.createElement('button')
    storeLiBtn.innerText = 'Add to cart'
    storeUl.appendChild(storeLiBtn)
  }
}

// rendering cart items

const cartLi = document.createElement('li')
cartUl.appendChild(cartLi)

const cartLiImg = document.createElement('img')
cartLiImg.setAttribute('class', 'cart--item-icon')
cartLiImg.setAttribute('src', 'assets/icons/001-beetroot.svg')
cartLiImg.setAttribute('alt', 'beetroot')
cartLi.appendChild(cartLiImg)

const p = document.createElement('p')
cartLi.appendChild(p)
p.innerText = 'beetroot'

const removeBtn = document.createElement('button')
removeBtn.setAttribute('class', 'remove-btn')
removeBtn.innerText = '-'
cartLi.appendChild(removeBtn)

const qntSpan = document.createElement('span')
qntSpan.setAttribute('class', 'quantity-text')
qntSpan.innerText = 1
cartLi.appendChild(qntSpan)

const addBtn = document.createElement('button')
addBtn.setAttribute('class', 'add-btn')
addBtn.innerText = '+'
cartLi.appendChild(addBtn)






renderAllStoreItems()