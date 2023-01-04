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

// Element selectors

const shopItemList = document.querySelector(".store--item-list");
const cartItemList = document.querySelector(".cart--item-list");

// Program Logic

// Event Handling

// Rendering

function renderShop () {
  state.items.forEach((item) => {
    const li = document.createElement('li');
    
    const div = document.createElement('div');
    div.setAttribute("class", "store--item-icon");

    const img = document.createElement('img');
    img.src = 'assets/icons/' + item.id + '.svg';
    img.alt = item.name;
    
    const addToCart = document.createElement('button');
    addToCart.innerHTML = 'Add to cart'

    div.append(img);
    li.append(div);
    li.append(addToCart);

    shopItemList.append(li);


  })
}

renderShop()