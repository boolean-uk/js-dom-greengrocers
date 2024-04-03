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

//Access html elements
const groceriesList = document.querySelector(".store--item-list")
const cartItems = document.querySelector("cart--item-list")


 const product = state.items

//  function createItems() {
// 		product.forEach((item) => {
// 			console.log(item.name)
// 			const createItem = document.createElement("li")
// 			createItem.classList.add("product")
// 			groceriesList.append(createItem)

// 			const itemImageContainer = document.createElement("div")
// 			itemImageContainer.classList.add("store--item-icon")
// 			groceriesList.append(itemImageContainer)

// 			const itemIcon = document.createElement("img")
// 			// console.log(item.id);
//       itemIcon.setAttribute("src", `assets/icons/${item.id}.svg`)
//       itemIcon.setAttribute('width', 64)
//       itemIcon.setAttribute('height', 64)
// 			itemImageContainer.append(itemIcon)

// 			const price = document.createElement("p")
// 			price.classList.add("product_price")
// 			price.innerText = `€ ${item.price}`
// 			itemImageContainer.append(price)

// 			const addToCart = document.createElement("button")
// 			addToCart.innerText = "ADD TO CART"
// 			itemImageContainer.append(addToCart)
// 		})
//  }

//  createItems()

//Access html elements
// const groceriesList = document.querySelector(".store--item-list")
// const cartItems = document.querySelector("cart--item-list")

const products = state.items


function createShopLi() {
    const shopItem = document.createElement("li")
	shopItem.classList.add("product")
	return shopItem
}

function createShopDiv() {
    const shopDiv = document.createElement("div")
    shopDiv.classList.add("store--item-icon")
    return shopDiv
}


function createShopImage(item) {
    const shopIcon = document.createElement("img")
	shopIcon.setAttribute("src", `assets/icons/${item.id}.svg`)
	shopIcon.setAttribute("width", 84)
    shopIcon.setAttribute("height", 84)
    return shopIcon
}

function createShopPrice(item) {
    const shopPrice = document.createElement("p")
	shopPrice.classList.add("product_price")
    shopPrice.innerText = `€ ${item.price}`
    return shopPrice
}

function createShopButton() {
    const addToCartBtn = document.createElement("button")
    addToCartBtn.innerText = "ADD TO CART"
    return addToCartBtn
}

function createShop() {
    products.forEach((item) => {
    const shopLi = createShopLi()
    const shopDiv = createShopDiv()
    const shopIcon = createShopImage(item)
    const shopPrice = createShopPrice(item)
    const addToCartButtons = createShopButton()
    
        groceriesList.append(shopLi)
        shopLi.append(shopDiv)
        shopDiv.append(shopIcon)
        shopDiv.append(shopPrice)
        shopDiv.append(addToCartButtons)
    })
}
createShop()
