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

const storeList = document.querySelector('.store--item-list');

function renderStoreList() {
  const storeItems = state.items

  for (let i = 0; i < storeItems.length; i++) {
    let item = storeItems[i];

    const storeListItem = document.createElement('li');
    storeList.append(storeListItem);

    const storeIconContainer = document.createElement('div');
    storeIconContainer.setAttribute('class', 'store--item-icon');
    storeListItem.append(storeIconContainer)

    const storeIcon = document.createElement('img');
    storeIcon.setAttribute('src', `assets/icons/${item.id}.svg`)
    storeIconContainer.append(storeIcon);

    const storeButton = document.createElement('button');
    storeButton.innerText = 'Add to cart'
    storeListItem.append(storeButton)
  }
}

renderStoreList()