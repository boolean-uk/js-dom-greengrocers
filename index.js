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
const cartContainer = document.querySelector(".cart--item-list-container")
const cartItems = document.querySelector(".cart--item-list")
const total = document.querySelector(".total-number")

const products = state.items
const productsInCart = state.cart
// const cartItemsObj = {}
// cartItemsObj.id = undefined
// cartItemsObj.name = undefined
// cartItemsObj.price = undefined
// cartItemsObj.qtyInCart = 0



//Create shop_list items
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

function createShopButton(item) {
	const addToCartBtn = document.createElement("button")
	addToCartBtn.innerText = "ADD TO CART"
	addToCartBtn.addEventListener("click", () => {
		if (!productsInCart.includes(item)) {
			productsInCart.push(item)
			item.qtyInCart = 1
		} else {
			item.qtyInCart++
		}
		renderCart()
		calcTotal()
	})
	return addToCartBtn
}

//Assemble shop_cards
function createShop() {
	products.forEach((item) => {
		const shopLi = createShopLi()
		const shopDiv = createShopDiv()
		const shopIcon = createShopImage(item)
		const shopPrice = createShopPrice(item)
		const addToCartButtons = createShopButton(item)

		groceriesList.append(shopLi)
		shopLi.append(shopDiv)
		shopDiv.append(shopIcon)
		shopDiv.append(shopPrice)
		shopDiv.append(addToCartButtons)
	})
}
createShop(products)


//Create cart's items
function createCartLi() {
	const cartItem = document.createElement("li")
	return cartItem
}

function cartItemImage(item) {
	const cartItemPic = document.createElement("img")
	cartItemPic.setAttribute("src", `assets/icons/${item.id}.svg`)
	return cartItemPic
}

function cartItemTxt(item) {
	const cartItemName = document.createElement("p")
	cartItemName.innerText = `${item.name}`
	return cartItemName
}

function qtyInCart() {
	const itemQty = document.createElement("span")
	itemQty.classList.add("quantity-text")
	itemQty.innerText = item.qtyInCart
	return itemQty
}

//Assemble cart
function createCartItems(item) {
	const cartLi = createCartLi()
	const cartItemImg = cartItemImage(item)
	const cartItemName = cartItemTxt(item)

	const removeItemBtn = document.createElement("button")
	removeItemBtn.classList.add("remove-btn")
	removeItemBtn.innerText = "-"
	removeItemBtn.addEventListener("click", () => decreaceQtyInCart(item))

	const itemsInCart = document.createElement("span")
	itemsInCart.classList.add("quantity-text")
	itemsInCart.innerText = item.qtyInCart

	const addItemBtn = document.createElement("button")
	addItemBtn.classList.add("add-btn")
	addItemBtn.innerText = "+"
	addItemBtn.addEventListener("click", () => increaceQtyInCart(item))

	cartContainer.append(cartItems)
	cartItems.append(cartLi)
	cartLi.appendChild(cartItemImg)
	cartLi.appendChild(cartItemName)
	cartLi.appendChild(removeItemBtn)
	cartLi.appendChild(itemsInCart)
	cartLi.appendChild(addItemBtn)
}

//Show cart
function renderCart() {
	cartItems.innerHTML = ""
	productsInCart.forEach(createCartItems)
}

//Calculate cart's total price
function calcTotal() {
	let currentTotal = 0
	productsInCart.forEach((el) => {
		currentTotal += el.price * el.qtyInCart
	})
	total.innerText = `€${currentTotal.toFixed(2)}`
}

//Add functionality to cart's + & - buttons
function increaceQtyInCart(item) {
	item.qtyInCart++
	renderCart()
	calcTotal()
}
function decreaceQtyInCart(item) {
	item.qtyInCart--
	if (item.qtyInCart < 1) {
		productsInCart.splice(productsInCart.indexOf(item),1)
	}
	renderCart()
	calcTotal()
}