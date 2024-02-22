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



// Select Root Elements
const groceriesListUL = document.querySelector(".item-list.store--item-list");

// Function to create an Item list item
function createItemListItem(item) {
  const itemLi = document.createElement('li');
  itemLi.classList.add('store--item-icon');

  // const itemName = document.createElement('h2');
  // itemName.classList.add('item--title');
  // itemName.innerText = item.name;
  // itemLi.appendChild(itemName);

  const itemImg = createItemImage(item.id);
  itemLi.appendChild(itemImg);

  const addToCartButton = createAddToCartButton(item);
  itemLi.appendChild(addToCartButton);
  return itemLi;
}

function createItemImage(itemId) {
  const itemImg = document.createElement('img');
  itemImg.classList.add('card--img');
  itemImg.setAttribute('src', `assets/icons/${itemId}.svg`);
  itemImg.setAttribute('width', '100');
  itemImg.setAttribute('height', '100')
  return itemImg;
}

function createAddToCartButton(item) {
  const button = document.createElement('button');
  button.innerText = 'ADD TO CART';
  button.addEventListener('click', () => {
    console.log(`${item.name} added`);
  })
  return button;
}

// Function to render the list of Groceries
function renderGroceries() {
  groceriesListUL.innerHTML = "";
  state.items.forEach(item => {
    const itemLi = createItemListItem(item);
    groceriesListUL.appendChild(itemLi);
  });
}


// Render
function main () {
  renderGroceries();
}

main();