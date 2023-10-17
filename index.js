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






state.items.forEach((item) =>{
  const listContent = document.querySelector('ul');

  const list = document.createElement('li');
  listContent.append(list);

  const div = document.createElement('div')
  div.setAttribute("class","store--item-icon");
  list.append(div)

// creating the greengrocers images
  const img = document.createElement('img')
  img.src = `assets/icons/${item.id}.svg`
  img.alt = item.name
  div.append(img);

  //creating the greengrocers image buttons
  const button = document.createElement('button')
  button.innerText = 'Add to cart'
  list.append(button);
  
// creating the eventlistener
  button.addEventListener('click',() =>{
    // const cartContent = document.querySelector('.cart--item-list-container');
    const cartItem = document.querySelector('.cart--item-list');
    const cartList = document.createElement('li');
    cartItem.append(cartList);
   

    const cartImg = document.createElement('img');
    cartImg.setAttribute('class', 'cart--item-icon');
    cartImg.src = `assets/icons/${item.id}.svg`;
    cartImg.alt = item.name;
    cartList.append(cartImg);


    const p = document.createElement('p');
    p.innerText = 'beetroot';
    cartList.append(p);

      const minusButton = document.createElement('button');
      minusButton.setAttribute('class', 'quantity-btn remove-btn center');
      minusButton.innerText = '-'
      cartList.append(minusButton);

      minusButton.addEventListener('click', () =>{
        const removeItem = state.cart.find((cartItem)=> cartItem.type === item.type)
        if (removeItem){
          if(removeItem.quantity !== 0){
            removeItem.quantity -=1
          }
        }
      })
      cartList.append(minusButton)
     
      
    const span = document.createElement('span');
    span.setAttribute('class', 'quantity-text center');
    span.innerText = '1';
    cartList.append(span);

    const plusButton = document.createElement('button');
    plusButton.setAttribute('class', 'quantity-btn add-btn center');
    plusButton.innerText = '+';
    cartList.append(plusButton);

    plusButton.addEventListener('click', (event)=> {
      const addItem = state.cart.find((cartItem)=> cartItem.type === item.type)
      if(addItem){
        addItem.quantity +=1
      }else{
        state.cart.push({item, quantity: 1})
      }
      
      });
      cartList.append(plusButton)
    
    

    
    
  
  
  
  
  
  })
}) 



