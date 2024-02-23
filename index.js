const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.32
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.11
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.14
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.43
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.17
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.26
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.13
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.08
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.26
    }
  ],
  cart: {}
}

const SORTING_FIELD = []
const ORDERED_ITEMS = []

const PRICE_ELM = document.querySelector('.total-number')
const ITEM_PARENT = document.querySelector('.store--item-list')
const CART_PARENT = document.querySelector('.cart--item-list')
const DOCUMENTS = {}

function loadHTMLDocument(path) {
  const _XMLRequest = new XMLHttpRequest()
  _XMLRequest.open('GET', path)
  _XMLRequest.onreadystatechange = function () {
      if (this.readyState !== 4 || this.status !== 200) return
      DOCUMENTS[path] = this.responseText
  }
  _XMLRequest.send()
}

function getDocument(key) {
  return new DOMParser().parseFromString(DOCUMENTS[key], 'text/html')
}

loadHTMLDocument('templates/cart-item.html')
loadHTMLDocument('templates/store-item.html')

standardOrder()
populateSortOptions()

setTimeout(populateItems, 300) // artificially wait for the documents to load (there is a better way in doing this, but I'm lazy)

function standardOrder() {
  ORDERED_ITEMS.length = 0
  for (const item of state.items)
    ORDERED_ITEMS.push(item.id)
}

function populateSortOptions() {
  const _selectElm = document.querySelector('.sort_order')
  const _validFields = [ 'id', 'name', 'price' ]
  
  for (const field of _validFields)
    _selectElm.innerHTML += '<option value="' + field + '">' + capitaliseString(field) + '</option>'
}

function onSortRequest(selectElm) {
  sortByField(selectElm.options[selectElm.selectedIndex].value)
  populateItems()
}

function sortByField(field) {
  ORDERED_ITEMS.length = 0
  SORTING_FIELD.length = 0
  for (const item of state.items) {
    var _isAtEnd = true

    for (var i = 0; i < SORTING_FIELD.length; i++) {
      if (SORTING_FIELD[i] > item[field]) {
        _isAtEnd = false
        ORDERED_ITEMS.splice(i, 0, item.id)
        SORTING_FIELD.splice(i, 0, item[field])
        break
      }
    }

    if (_isAtEnd) {
      ORDERED_ITEMS.splice(ORDERED_ITEMS.length, 0, item.id)
      SORTING_FIELD.splice(SORTING_FIELD.length, 0, item[field]) 
    }
  }
}

function populateItems() {
  ITEM_PARENT.innerHTML = ""

  for (const id of ORDERED_ITEMS) {
    const _item = state.items.find(function (elm) { return elm.id === id })
    const _itemDisplay = getDocument('templates/store-item.html')

    _itemDisplay.documentElement.querySelector('.store--item-icon').children[0].setAttribute('src', 'assets/icons/' + id + '.svg')
    
    const _button = _itemDisplay.documentElement.querySelector('button')
    _button.setAttribute('onclick', 'addToCart("' + id + '")')

    _itemDisplay.documentElement.querySelector('p').innerHTML = '£' + _item.price

    ITEM_PARENT.innerHTML += _itemDisplay.documentElement.innerHTML
  }
}

function addToCart(id) {
  const _item = state.items.find(function (i) { return i.id == id })

  if (state.cart[id] !== undefined) return
  
  state.cart[id] = {}
  state.cart[id]['quantity'] = 1

  const _cartDisplay = getDocument('templates/cart-item.html')
  const _img = _cartDisplay.documentElement.querySelector('.cart--item-icon')
  _img.setAttribute('src', 'assets/icons/' + id + '.svg')
  _img.setAttribute('alt', _item.name)

  _cartDisplay.documentElement.querySelector('p').innerHTML = capitaliseString(_item.name)

  _cartDisplay.documentElement.querySelector('.remove-btn').setAttribute('onclick', 'removeQuantity("' + id + '")')
  _cartDisplay.documentElement.querySelector('.add-btn').setAttribute('onclick', 'addQuantity("' + id + '")')
  //_cartDisplay.documentElement.querySelector('.quantity-text').setAttribute('onchange', 'setQuantity("' + id + '")')
  
  // well this is an annoying line....
  _cartDisplay.documentElement.children[1].children[0].setAttribute('class', 'cart_' + id)

  CART_PARENT.innerHTML += _cartDisplay.documentElement.innerHTML

  updatePrice()
}

function addQuantity(id) {
  const _targetItem = CART_PARENT.querySelector('.cart_' + id)
  state.cart[id].quantity++
  
  updatePrice()

  _targetItem.querySelector('.quantity-text').innerHTML = state.cart[id].quantity
}

function removeQuantity(id) {
  const _targetItem = CART_PARENT.querySelector('.cart_' + id)
  state.cart[id].quantity--

  updatePrice()

  if (state.cart[id].quantity <= 0) {
    // prepare to delete element
    _targetItem.remove()
    delete state.cart[id]
    return
  }

  _targetItem.querySelector('.quantity-text').innerHTML = state.cart[id].quantity
}

function updatePrice() {
  var _totalPrice = 0

  for (const [key, item] of Object.entries(state.cart)) {
    const _itemRef = state.items.find(function (elm) { return key === elm.id })
    if (_itemRef === undefined) continue

    _totalPrice += item.quantity * _itemRef.price
  }

  PRICE_ELM.innerHTML = '£' + _totalPrice.toFixed(2)
}

function capitaliseString(str) {
  if (str.length === 0) return str
  return str[0].toUpperCase() + str.slice(1, str.length)
}
