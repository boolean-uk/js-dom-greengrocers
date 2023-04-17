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

const storeList = document.querySelector('ul')
const cartList = document.querySelector('cart--item-list')

function renderShopList(state) {


  for (i = 0; i < state.items.length; i++) {

    const shopItem = document.createElement('li')
    const itemImage = document.createElement('img')
    itemImage.setAttribute('src', `/assets/icons/${state.items[i].id}.svg`)
    console.log(state.items)
    itemImage.setAttribute('alt', '')
    itemImage.setAttribute('height', '100')
    itemImage.style.objectFit = 'cover'


    const purchaseButton = document.createElement('button')
    purchaseButton.innerText = "Add to Cart"



    shopItem.append(itemImage, purchaseButton)
    storeList.append(shopItem)

  }

}
renderShopList(state)