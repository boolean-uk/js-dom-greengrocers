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

//const for the product section
const productSection = document.querySelector(".store--item-list")

//function to create the cards
function createCard(){
  state.items.forEach(item => {
    // Create elements for the item card
    const li = document.createElement('li');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const button = document.createElement('button');
    button.innerText = "Add to cart";

    img.src = `assets/icons/${item.id}.svg`;
    div.setAttribute('class', 'store--item-icon');
    div.append(img);

    li.append(div, button);
    productSection.append(li);
  });
}
createCard();
  
//function to add items to cart

//function to check if the item is in cart and if so increase the quantity in the cart

//function to look inside the cart and adjust the number of items inside, if the quantity is 0, remove the item from the cart

//function to calculate the total price of the items in the cart