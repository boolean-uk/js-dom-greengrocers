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

// for all the items in const state, render it as a li to replicates store-item.html in header (#id=store)

const itemList = document.querySelector('.store--item-list')
console.log(itemList)
createItemList()
function createItemList (){
  state.items.forEach((itemJSState) => {
    const li = document.createElement('li')
    itemList.appendChild(li)
    const div = document.createElement('div')
    div.setAttribute('class', 'store--item-icon')
    li.appendChild(div)
    const img = document.createElement('img')
  
    img.setAttribute('src',`assets/icons/${itemJSState.id}.svg`)
    img.setAttribute('alt',`${itemJSState.name}`)
    div.appendChild(img)
    const btn = document.createElement('button')
    btn.innerText="Add to cart"
    li.appendChild(btn)



    
    
  });
}

// all the items should contain appropriate image and a button "add to cart" inside li
// when the add button is being pressed an event listener activate and adds the item in the item-list cart--item-list as a li
// render the item for user
// cart--item-list should contain image, name and quantity
// If the item is already in the cart, increase or decrease  the item's quantity in the cart with respective class
// add event listener to cart--item-list li to increase(create a function) or decrease(function) quantity and remove when 0
// create a function to display total by sum of cart-item price * quantity
// display the total in span 
// display 0 if no item in cart