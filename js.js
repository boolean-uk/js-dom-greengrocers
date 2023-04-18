//Create store items
function create_store_items() {
  for (let i = 0; i < state.items.length; i++) {
    let id = state.items[i].id;
    let name = state.items[i].name;
    let price = state.items[i].price;
    let imgpath = `assets/icons/${id}.svg`;

    const itemList_store = document.querySelector(".store--item-list");
    const storeItem = document.createElement("li");
    itemList_store.append(storeItem);
    const div = document.createElement("div");
    div.setAttribute("class", "store--item-icon");
    storeItem.appendChild(div);
    const img = document.createElement("img");
    img.setAttribute("src", `${imgpath}`);
    img.setAttribute("alt", `${name}`);
    div.append(img);
    const button = document.createElement("button");
    button.innerText = "Add to cart";
    storeItem.append(button);

    button.setAttribute("id", `${id}`);
    button.addEventListener("click", function () {
      addtocart(id, name, price, imgpath);
    });
  }
}

function addtocart(id, name, price, imgpath) {
  console.log(`${name} costs ${price} ${id} ${imgpath}`);
  /*  const itemlist_cart = document.querySelector(".cart--item-list");
  const add_item_cart = document.createElement("li");
  itemlist_cart.append(add_item_cart);
  const img = document.createElement("img");
  add_item_cart.append(img);
  img.setAttribute("class", "cart--item-icon");
  img.setAttribute("src", "assets/icons/001-beetroot.svg");
  img.setAttribute("alt", "beetroot"); */
}

create_store_items();
