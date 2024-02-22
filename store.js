const createItem = (item) => {
    return `<li class="store--item" item-id="${item.id}">
    <div class="store--item-icon">
      <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
    </div>
    <button class="store--item-btn">Add to cart</button>
  </li>`
  }

  const createItemStore = (store) => {
    return store.map(p => createItem(p))
  }

  document.getElementsByClassName('store--item-list')[0].innerHTML =
  createItemStore(state.items).join("")

  const itemsInStore = document.querySelectorAll('.store--item');

  itemsInStore.forEach((storeItem) => {
    const btn = storeItem.querySelector('.store--item-btn')
    btn.addEventListener('click', () => {
      const itemId = storeItem.getAttribute("item-id");
      let itemToCart
      state.items.forEach((item) => {
        if (item.id === itemId){ itemtoCart = item}
      })
      AddToCart(itemtoCart)
    })
  })