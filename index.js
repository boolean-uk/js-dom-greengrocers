const itemUl = document.querySelector('.store--item-list')
const state = {
  items: [
    {
      id: '001-beetroot',
      name: 'beetroot',
      price: 0.35
    },
    {
      id: '002-carrot',
      name: 'carrot',
      price: 0.35
    },
    {
      id: '003-apple',
      name: 'apple',
      price: 0.35
    },
    {
      id: '004-apricot',
      name: 'apricot',
      price: 0.35
    },
    {
      id: '005-avocado',
      name: 'avocado',
      price: 0.35
    },
    {
      id: '006-bananas',
      name: 'bananas',
      price: 0.35
    },
    {
      id: '007-bell-pepper',
      name: 'bell pepper',
      price: 0.35
    },
    {
      id: '008-berry',
      name: 'berry',
      price: 0.35
    },
    {
      id: '009-blueberry',
      name: 'blueberry',
      price: 0.35
    },
    {
      id: '010-eggplant',
      name: 'eggplant',
      price: 0.35
    }
  ],

  cart: []
}
function renderListItems() {
  for (let i = 0; i < state.items.length; i++) {
    const item = state.items[i]
    console.log(item)
    const alt = item.name
    const list = document.createElement('li')
    itemUl.append(list)

    const div = document.createElement('div')
    div.setAttribute('class', 'store--item-icon')
    list.append(div)

    const img = document.createElement('img')
    img.setAttribute('src', `assets/icons/${item.id}.svg`)
    img.setAttribute('alt', alt)
    div.append(img)

    const AddToCartButton = document.createElement('button')
    AddToCartButton.innerText = `Add To cart`
    list.append(AddToCartButton)
  }
  
}
renderListItems()
