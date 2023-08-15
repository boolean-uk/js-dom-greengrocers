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

function drawStoreItem(item) {
  // get to unordered list of store items
  const container = document.getElementsByClassName('store--item-list')[0]
  const listItem = document.createElement('li')
  const itemDiv = document.createElement('div')
  itemDiv.classList.add('store--item-icon')
  // create image element
  const itemName = item.name
  const itemImg = document.createElement('img')
  itemImg.src = `./assets/icons/${item.id}.svg`
  itemImg.alt = itemName
  itemDiv.append(itemImg)
  // create button
  const button = document.createElement('button')
  button.innerHTML = 'Add to cart'
  itemDiv.append(button)
  listItem.append(itemDiv)
  container.append(listItem)
}

function drawStoreItems(items) {
  items.forEach(item => drawStoreItem(item))
}

drawStoreItems(state.items)