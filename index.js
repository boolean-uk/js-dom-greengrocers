const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
    },
  ],
  cart: [],
};

// for all the items in const state, render it as a li to replicates store-item.html in header (#id=store)
// all the items should contain appropriate image and a button "add to cart" inside li
const itemList = document.querySelector(".store--item-list");
console.log(itemList);
function calculateTotal() {
  // this function should calculate total of the cart
  let cartTotal = 0;
  // calculate total

  // display total
  return cartTotal;
}

createItemList();
function createItemList() {
  state.items.forEach((item, index) => {
    const li = document.createElement("li");
    itemList.appendChild(li);

    const div = document.createElement("div");
    div.setAttribute("class", "store--item-icon");
    li.appendChild(div);

    const img = document.createElement("img");
    img.setAttribute("src", `assets/icons/${item.id}.svg`);
    img.setAttribute("alt", `${item.name}`);
    div.appendChild(img);

    const btn = document.createElement("button");
    btn.innerText = "Add to cart";
    li.appendChild(btn);

    // when the add button is being pressed an event listener activate
    // and adds the item in the item-list cart--item-list as a li
    // render the item for user
    // cart--item-list should contain image, name and quantity

    const cartItem = document.querySelector(".cart--item-list");
    btn.addEventListener("click", () => {
      // store the item if the item is found in the cart

      const itemFound = state.cart.find(
        (itemFromCart) => itemFromCart.id === item.id
      );

      // i need to look at my cart if i already have item
      // if i have then increase the quantity>

      if (itemFound) {
        itemFound.quantity++;
      } else {
        // if dont have it then run the following code
        const addTocartItem = {};
        addTocartItem.id = item.id;
        addTocartItem.name = item.name;
        addTocartItem.img = `assets/icons/${item.id}.svg`;
        addTocartItem.quantity = 1;
        state.cart.push(addTocartItem);

        // rendering list of item in the cart
        const li = document.createElement("li");
        cartItem.appendChild(li);
        state.items.push(li);

        // rendering img in the cart
        const img = document.createElement("img");
        img.setAttribute("class", "cart--item-icon");
        img.setAttribute("src", `assets/icons/${item.id}.svg`);
        img.setAttribute("alt", `${item.name}`);
        li.appendChild(img);

        // rendering item name in the cart
        const p = document.createElement("p");
        p.innerText = ("p", `${item.name}`);
        li.appendChild(p);

        // rendering remove button element to decrease the quantity
        const removeButton = document.createElement("button");
        removeButton.setAttribute("class", "quantity-btn remove-btn center");
        removeButton.innerText = "-";
        li.appendChild(removeButton);

        // rendering quantity element to display the quantity
        const span = document.createElement("span");
        span.setAttribute("class", "quantity-text center");

        // inserting quantity to current item
        span.innerText = addTocartItem.quantity;
        li.appendChild(span);

        // rendering add button element to increase the quantity
        const addButton = document.createElement("button");
        addButton.setAttribute("class", "quantity-btn add-btn center");
        addButton.innerText = "+";
        li.appendChild(addButton);

        // increasing the item quantity in the cart with the + sign
        addButton.addEventListener("click", () => {
          addTocartItem.quantity += 1;
          span.innerText = addTocartItem.quantity;
        });

        //  removing the item quantity in the cart with - sign and when it is 0
        removeButton.addEventListener("click", () => {
          addTocartItem.quantity -= 1;

          if (addTocartItem.quantity < 1) {
            let itemindex;
            for (let i = 0; i < state.cart.length; i++) {
              if (state.cart[i].id === addTocartItem.id) {
                console.log("chech index", addTocartItem);
                itemindex = i;
              }
            }
            li.remove();
            state.cart.splice(itemindex, 1);
          }
          span.innerText = addTocartItem.quantity;
        });

        // create a function to display total by sum of cart-item price * quantity
        // display the total in span
        const totalPrice = calculateTotal();
        console.log("total price", totalPrice);
        // display 0 if no item in cart
      }
    });
  });
}
