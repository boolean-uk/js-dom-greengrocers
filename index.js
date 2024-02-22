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
  cart: [],
};

  const handleClick = () => {

  }


  window.onload = function() {
    const itemContainer = document.querySelector('.store--item-list');
    for(let i = 0; i < state.items.length; i++){
      // Template for store item
      const item = document.createElement('li');
      item.className = state.items[i].id
      const itemImageContainer = document.createElement('div')
      item.appendChild(itemImageContainer)
      itemImageContainer.className = "store--item-icon"

      // image
      const itemImage = document.createElement('img')
      itemImage.src = `assets/icons/${state.items[i].id}.svg`
      itemImageContainer.appendChild(itemImage)

      // button
      const addToCartButton = document.createElement('button')
      addToCartButton.textContent = "ADD TO CART"
      item.appendChild(addToCartButton)




      itemContainer.appendChild(item)
    }
  }


