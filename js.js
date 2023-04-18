//Create store items
function create_store_items() {
  for (let i = 0; i < state.items.length; i++) {
    const itemlist_store = document.querySelector(".store--item-list");
    const add_store_item = document.createElement("li");
    itemlist_store.append(add_store_item);
    const div = document.createElement("div");
    div.setAttribute("class", "store--item-icon");
    add_store_item.appendChild(div);
    const img = document.createElement("img");
    img.setAttribute("src", `assets/icons/${state.items[i].id}.svg`);
    img.setAttribute("alt", `${state.items[i].name}`);
    div.append(img);
    const button = document.createElement("button");
    button.innerText = "Add to cart";
    add_store_item.append(button);
  }
}
create_store_items();

//Add event listener to the button
