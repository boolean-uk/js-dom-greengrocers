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
const renderHeader = () => {

  state.items.forEach((item)=> {
    const itemListContainer = document.querySelector('.item-list');
    
    
    const listItem = document.createElement('li');
    itemListContainer.append(listItem);

    const imageBox = document.createElement('div');
    imageBox.classList.add('store--item-icon')
    listItem.append(imageBox);

    const image= document.createElement('img');
    image.src = `assets/icons/${item.id}.svg`
    image.alt= item.name;
    imageBox.append(image); 

    const button= document.createElement('button');
    button.innerText = 'add to cart';
    listItem.append(button);
    const eventButton = document.querySelector('button');
    const newItem= document.querySelector('span');
    eventButton.addEventListener ('click',() =>{
      newItem ++;
    })

    });
  
}
const renderMain = () => {
  state.items.forEach((item) => {
    const itemListBox = document.querySelector('.cart--item-list');

    const listItem2 = document.createElement('li');
    itemListBox.append(listItem2);

    const image= document.createElement('img');
    image.src = `assets/icons/${item.id}.svg`
    image.alt= item.name;
    listItem2.append(image);

    const paragraph = document.createElement('p')
    paragraph.innerText = item.name;
    listItem2.append(paragraph);

    const addButton = document.createElement('button');
    addButton.innerText = `+`;
    listItem2.append(addButton);

    addButton.addEventListener('click', () => {
      const totalNumber = listItem2.querySelector('span');
      let count = parseInt(totalNumber.innerText);
      count++; // Increase the count.
      totalNumber.innerText = count;
    });
    
    
    const totalNumber = document.createElement('span');
    totalNumber.innerText = '1';
    listItem2.append(totalNumber);
    
    const removeButton= document.createElement('button');
    removeButton.innerText = '-';
    listItem2.append(removeButton);
    removeButton.addEventListener('click', () => {
      const totalNumber = listItem2.querySelector('span');
      let count = parseInt(totalNumber.innerText);
      if (count > 0) {
        count--; // Decrease the count, but ensure it doesn't go below zero.
        totalNumber.innerText =count;
    }
    });




  })
}
renderHeader();
renderMain();