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

let groceryList = document.querySelector('.store--item-list')


function createStoreItemList() {
for (let i=0; i < state.items.length; i++) {
    const item = state.items[i]
    console.log(i, item);

    const listItem = document.createElement('li')
      listItem.innerText = item.name
      groceryList.append(listItem)

      // adding an image to listItem//
      const itemImage = document.createElement('div')
      itemImage.setAttribute('class', 'store--item-icon')
      itemImage.innerHTML = `<img src="assets/icons/${item.id}.svg" alt="beetroot" />`
      listItem.append(itemImage)

    }
}
createStoreItemList()






