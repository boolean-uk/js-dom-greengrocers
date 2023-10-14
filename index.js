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

const store = document.querySelector('#store')
const storeUl = document.querySelector(".store--item-list");
const cartUl = document.querySelector(".cart--item-list");
const price = document.querySelector(".total-number");

const items = state.items;
const cart = state.cart;

function renderStoreList() {
  state.items.forEach((item) => {
    const storeList = document.createElement('li')

    const storeDiv = document.createElement('div')
    storeDiv.className = ".store--item-icon"

    const storeListImg = document.createElement('img')
    storeListImg.src = `assets/icons/${item.id}.svg`
    storeListImg.alt = `${item.name}`
    storeDiv.append(storeListImg)

    const storeButton = document.createElement('button')
    storeButton.innerText = "Add to cart"

    storeList.append(storeDiv)
    storeList.append(storeButton)

    storeUl.append(storeList)

    storeButton.addEventListener('click', () => {
      item.quantity =+ 1
      cart.push(item)

      const cartList = document.createElement('li')

      const cartListImg = document.createElement('img')
      cartListImg.src = `assets/icons/${item.id}.svg`
      cartListImg.alt = `${item.name}`

      const p = document.createElement('p')
      p.innerText = item.name

      const removeButton = document.createElement("button");
      removeButton.className = "quantity-btn remove-btn center"
      removeButton.innerText = "-"
      const span = document.createElement("span");
      span.className = "quantity-text center"
      span.innerText = item.quantity
      const addButton = document.createElement("button");
      addButton.className = "quantity-btn add-btn center"
      addButton.innerText = "+"

      cartList.append(cartListImg, p, removeButton, span, addButton)
      cartUl.append(cartList)
    })

  })
}

function removeCartList() {
  const cartLists = cartUl.querySelectorAll('li')
  cartLists.forEach((cartList) => cartList.remove())
}


renderStoreList()

// function makeStoreList() {
//   state.items.forEach((item) => {
//     const storeList = document.createElement('li')
//     storeList.innerText = item.name
//     const storeUl = document.querySelector('.store--item-list')
//     const addButton = document.createElement('button')
//     addButton.innerText = 'Add item'
//     const storeIconContainer = makeStoreIconContainer()
//     const storeImage = makeBeetRoot()
//     storeIconContainer.append(storeImage)
//     storeList.append(storeIconContainer)
//     storeList.append(addButton)

//     addButton.addEventListener('click', (e) => {
//       const cartItemList = document.querySelector('.cart--item-list')
//       // const cartValue = e.target.value

//       // cartItemList.append(cartValue)
//       console.log(item.name)
//     })
    

//     storeUl.append(storeList)

//   });
// }

// makeStoreList()

// function makeStoreIconContainer() {
//   const storeIconContainer = document.createElement('div')
//   storeIconContainer.className = "store--item-icon"

//   return storeIconContainer

// }
// function makeBeetRoot(){
//   const beetRoot = document.createElement('img')
//   beetRoot.src = "assets/icons/001-beetroot.svg"
//   beetRoot.alt = "beetroot"

//   return beetRoot
// }

// function makeCarrot(){
//   const carrot = document.createElement('img')
//   beetRoot.src = "assets/icons/002-Carrot.svg"
//   beetRoot.alt = "carrot"

//   return carrot
// }

// // function renderStoreList() {
// //   const storeUl = document.querySelector('.store--item-list')
// //   const storeList = makeStoreList()
// //   const storeIconContainer = makeStoreIconContainer()
// //   const addButton = document.createElement('button')

// //   const beetRoot = makeBeetRoot()
// //   const carrot = makeCarrot()

// //   storeIconContainer.append(beetRoot)
// //   storeIconContainer.appen(carrot)

// //   storeList.append(storeIconContainer)
// //   storeUl.append(storeList)
// // }

// renderStoreList()