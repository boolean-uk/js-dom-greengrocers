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

const storeUl = document.querySelector('.store--item-list')
const cartUl = document.querySelector('.cart--item-list')
const total = document.querySelector('.total-number')


function AddItem(item)
{
  console.log(`Add ${item.name} to card`)
  //Check if already in cart
  const inCart = state.cart.find(x => x.id === item.id)
  //If it is, increase quantity
  if (typeof inCart === 'undefined')
  {
    const newItem = {
      id : item.id,
      name : item.name,
      price: item.price,
      quantity:1
    }
    state.cart.push(newItem)
  }
  else {
    inCart.quantity++
  }
  RenderAllCartItems()
}

function RemoveItem(item)
{
  item.quantity--
  if (item.quantity === 0)
  {
    state.cart.splice(state.cart.indexOf(item), 1)
  }
  RenderAllCartItems()
}

function RenderAllCartItems()
{
  cartUl.innerHTML = ""
  state.cart.forEach((item) => RenderCartItem(item))
  total.innerHTML = `£${CalculatePrice()}`
}

function CalculatePrice()
{
  var result = 0
  state.cart.forEach((x) => result += (x.price * x.quantity))
  return result.toFixed(2)
}



function RenderCartItem(item)
{
  var li = document.createElement('li')
  img = document.createElement('img')
  img.src =`assets/icons/${item.id}.svg`
  img.class = "cart--item-icon"
  img.alt = `${item.name}`
  var p = document.createElement('p')
  p.appendChild(document.createTextNode(`${item.name}`))

  var removeButton = document.createElement('button')
  removeButton.class = "quantity-btn remove-btn center"
  removeButton.addEventListener('click', () => RemoveItem(item))
  removeButton.appendChild(document.createTextNode('-'))

  var span = document.createElement('span')
  span.class = "quantity-text center"
  span.appendChild(document.createTextNode(`${item.quantity}`))
  
  var addButton = document.createElement('button')
  addButton.class = "quantity-btn add-btn center"
  addButton.addEventListener('click', ()=> AddItem(item))
  addButton.appendChild(document.createTextNode('+'))
   
  li.appendChild(img)
  li.appendChild(p)
  li.appendChild(removeButton)
  li.appendChild(span)
  li.appendChild(addButton)
  cartUl.appendChild(li)
}

function RenderStoreItem(item, ul)
{
  var li = document.createElement('li')
  var cartDiv = document.createElement('div')
  img = document.createElement('img')
  img.src = `assets/icons/${item.id}.svg`
  img.alt = "beetroot"
  button = document.createElement('button');
  button.addEventListener("click", () => AddItem(item))
  button.appendChild(document.createTextNode('Add to cart'))
  cartDiv.appendChild(img)
  li.append(cartDiv)
  li.appendChild(button)
  ul.appendChild(li)

}

function Initialise()
{
  state.items.forEach((item) => RenderStoreItem(item, storeUl))
  console.log("Initialise")
}

Initialise()

