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

// Requirement One - a user can view a selection of items in the store

// we want loop through and generate several items
function store() {


  function productSelection() {

    for (let i = 0; i <= state.items.length; i++) {

     
      const productInfo = state.items[i]
    
    
      const header = document.querySelector('header')
      const productList = document.querySelector('.item-list.store--item-list');
      header.append(productList)
      // create the li
      const productItem = document.createElement('li');
      // appen the li to the UL
      productList.append(productItem);
      // create the div and set the class
      const productDiv = document.createElement('div');
      productDiv.setAttribute('class', 'store--item-icon')
      // create the img 
      const productImage = document.createElement('img');
      productImage.src = `assets/icons/${productInfo.id}.svg`

      const ProductName = productInfo.name
      productImage.setAttribute('alt', `${ProductName}`);
      // append the image to the div
      productDiv.append(productImage);
      // create a button
      const buttonAddtoCart = document.createElement('button');
      buttonAddtoCart.innerText = "Add to cart";
      //  append productDiv and button to li or productItem
      productItem.append(productDiv, buttonAddtoCart);

    }

  }

  productSelection()
  
}
store()
