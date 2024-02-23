  const state = {
  items: [
      {
          id: "001-beetroot",
          name: "beetroot",
          price: 0.35,
          categories: ["vegetable", "root"],
      },
      {
          id: "002-carrot",
          name: "carrot",
          price: 0.35,
          categories: ["vegetable", "root"]
      },
      {
          id: "003-apple",
          name: "apple",
          price: 0.35,
          categories: ["fruit"],
      },
      {
          id: "004-apricot",
          name: "apricot",
          price: 0.35,
          categories: ["fruit"],
      },
      {
          id: "005-avocado",
          name: "avocado",
          price: 0.35,
          categories: ["vegetable"],
      },
      {
          id: "006-bananas",
          name: "bananas",
          price: 0.35,
          categories: ["fruit"],
      },
      {
          id: "007-bell-pepper",
          name: "bell pepper",
          price: 0.35,
          categories : ["vegetable"]
      },
      {
          id: "008-berry",
          name: "berry",
          price: 0.35,
          categories: ["fruit", "berry"]
      },
      {
          id: "009-blueberry",
          name: "blueberry",
          price: 0.35,
          categories: ["fruit", "berry"]
      },
      {
          id: "010-eggplant",
          name: "eggplant",
          price: 0.35,
          categories: ["vegetable"]
      },
  ],
  cart: []
};

const handleClickInventoryItem = (itemName) => {
  let item = state.items.find(item => item.name === itemName);
  if (state.cart.some(i => i.name === itemName)) return;

  state.cart.push({...item, quantity: 1});
  rerender();
}

const InventoryItem = (item) => {
  return `
    <li>
      <div class="store--item-icon">
        <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
      </div>
      <p>${item.name}</p>
      <button onClick="handleClickInventoryItem('${item.name}')">Add to cart</button>
    </li>
  `
}

const handleClickCartItem = (id, value) => {
  let item = state.cart.find(item => item.id === id);
  if (item.quantity + value <= 0) {
    state.cart = state.cart.filter(item => item.id !== id);
  } else {
    item.quantity += value;
  }
  rerender();
}

const CartItem = (item) => {
  return `
    <li>
      <img
        class="cart--item-icon"
        src="assets/icons/${item.id}.svg"
        alt="${item.name}"
      />
      <p>${item.name}</p>
      <button class="quantity-btn remove-btn center" onClick="handleClickCartItem('${item.id}', ${-1})">-</button>
      <span class="quantity-text center">${item.quantity}</span>
      <button class="quantity-btn add-btn center" onClick="handleClickCartItem('${item.id}', ${1})">+</button>
    </li>
  `
}

const handleButtonClick = () => {
  let sort = document.getElementById("sort").checked;
  let fruits = document.getElementById("fruits").checked;
  let vegetables = document.getElementById("vegetables").checked;
  let berries = document.getElementById("berries").checked;
  let roots = document.getElementById("roots").checked;

  let items = state.items.filter(item => {
    let categories = item.categories;
    return (fruits && categories.includes("fruit")) ||
      (vegetables && categories.includes("vegetable")) ||
      (berries && categories.includes("berry")) ||
      (roots && categories.includes("root"));
  });

  if (sort) {
    items = items.sort((a, b) => a.name.localeCompare(b.name));
  }
  rerenderStore(items);
}

const Buttons = () => {
  return `
    <div class="store--buttons">
      <div>
        <input onClick="handleButtonClick()" type="checkbox" id="sort" name="sort" />
        <label for="scales">Sort</label>
      </div>
      <div>
        <input onClick="handleButtonClick()" type="checkbox" id="fruits" name="fruits" checked />
        <label for="scales">Fruits</label>
      </div>
      <div>
        <input onClick="handleButtonClick()" type="checkbox" id="vegetables" name="vegetables" checked />
        <label for="scales">Vegetables</label>
      </div>
      <div>
        <input onClick="handleButtonClick()" type="checkbox" id="berries" name="berries" checked />
        <label for="scales">Berries</label>
      </div>
      <div>
        <input onClick="handleButtonClick()" type="checkbox" id="roots" name="roots" checked />
        <label for="scales">Roots</label>
      </div>
    </div>
  `
}

const rerender = () => {
  document.getElementsByClassName("item-list cart--item-list")[0].innerHTML = state.cart.map(CartItem).join('');
  document.getElementsByClassName('total-number')[0].innerHTML = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
}

const rerenderStore = (items = state.items) => {
  document.getElementsByClassName("item-list store--item-list")[0].innerHTML = items.map(InventoryItem).join('');
}

document.getElementsByClassName("item-list store--item-list")[0].innerHTML = state.items.map(InventoryItem).join('');
document.getElementById("store").innerHTML = Buttons() + document.getElementById("store").innerHTML;