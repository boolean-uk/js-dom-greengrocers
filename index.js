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

// HIGH LEVEL STORE VARIABLES
const storeList = document.querySelector('#store > ul')

// COMPLETE RENDER FUNCTION

const render = () => {
  renderStore()
}


// CREATE STORE FUNCTIONS
const createStoreItemButton = () => {
  const storeItemButton = document.createElement('button')
  storeItemButton.innerText = "Add to cart"
  return storeItemButton
}

const selectStoreItemImage = (item) => {
  const storeItemImage = document.createElement('img')
  storeItemImage.src = `assets/icons/${item.id}.svg`
  return storeItemImage
}

const createStoreItemDiv = (item) => {
  const storeItemDiv = document.createElement('div')
  storeItemDiv.setAttribute('class', 'store--item-icon')
  storeItemDiv.append(selectStoreItemImage(item))

  return storeItemDiv
}

// DISPLAY EACH OF THE STORE ITEMS ON THE PAGE

const renderStore = () => {
  state.items.forEach((item) => {
    const storeItem = document.createElement('li')
    storeItem.innerText = "placeholder"
  
    storeItem.append(createStoreItemDiv(item))
    // storeItem.append(selectStoreItemImage(item))
  
    storeItem.append(createStoreItemButton())
    
    storeList.append(storeItem)
  })
}

render()