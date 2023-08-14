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

const groceries = document.querySelector('.store--item-list')

function displayStore() {
  const storeItems = state.items
  for (let i = 0; i < storeItems.length; i++){
    //Create Vegetable Icon in the Store Section
    const storeItem = document.createElement('li')
    const vegetable = document.createElement('div')
    vegetable.classList.add("store--item-icon")
    const img = document.createElement('img')
    img.src = 'assets/icons/' + storeItems[i].id + '.svg'
    img.alt = storeItems[i].name

    //Create Button below each Vegetable Icon
    const button = document.createElement('button')
    button.innerText = 'Add to cart'
    button.addEventListener('click', function() {
      console.log(storeItems[i].name)
    })

    //Append Elements to the page
    vegetable.append(img)
    storeItem.append(vegetable)
    storeItem.append(button)
    groceries.append(storeItem)
  }
}

displayStore()