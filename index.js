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
  cart: [
    // {
    //   id: "007-bell-pepper",
    //   name: "bell pepper",
    //   price: 0.35
    // },
    // {
    //   id: "008-berry",
    //   name: "berry",
    //   price: 0.35
    // },
    // {
    //   id: "009-blueberry",
    //   name: "blueberry",
    //   price: 0.35
    // },
    // {
    //   id: "010-eggplant",
    //   name: "eggplant",
    //   price: 0.35
    // }
  ]
};


//access the html element we will need to either append things to, or to modify.
const store = document.querySelector('#store')
const storeItemList = document.querySelector('.store--item-list')
const cart = document.querySelector('#cart')
const cartItemListContainer = document.querySelector('.cart--item-list-container')
const cartItemList = document.querySelector('.cart--item-list')
const totalSection = document.querySelector('.total-section')
const total = document.querySelector('.total-number')

//check that all const are pointing where they should: 
console.log(store)
console.log(storeItemList)
console.log(cart)
console.log(cartItemListContainer)
console.log(cartItemList)
console.log(totalSection)
console.log(total.innerText)




populateStoreItemList()

populateCartItemList()




