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
    cart: [
        {
            id: "001-beetroot",
            name: "beetroot",
            price: 0.35,
            quantity: 1
          },
          {
            id: "002-carrot",
            name: "carrot",
            price: 0.35,
            quantity: 1
          },
          {
            id: "003-apple",
            name: "apple",
            price: 0.35,
            quantity: 1
          }
    ],
  };

  //to render the items in the store
  function renderStorelist(){

    //to loop through everything in the state.items
    state.items.forEach((item)=>{
        
        //select the ul from the header
        const listOfItems = document.querySelector('.store--item-list')
        
        //select the li to create the image
        const storeList = document.createElement('li')

        //create a div for the store list
        const itemDiv =document.createElement('div')
        itemDiv.setAttribute('class','store--item-icon')

        const itemImage = document.createElement('img')
        itemImage.setAttribute('src',`assets/icons/${item.id}.svg`)
        itemImage.setAttribute('alt','item.name')

        const addButton = document.createElement('button')
        addButton.innerText = 'Add to cart'

        //add addeventlistener to the button
        addButton.addEventListener('click',()=>{

        })
        //appends
        itemDiv.append(itemImage)
        storeList.append(itemDiv,addButton)
        listOfItems.append(storeList)
    })

  }

  function renderCartList() {
    //select ul from cart
      const cartList = document.querySelector('.cart--item-list');
  
      //to remove items in the card after rendering
      const removeItemsInTheCart =cartList.querySelectorAll('*');
      removeItemsInTheCart.forEach((childElement)=>childElement.remove());

      //for eacg item in the cart
    state.cart.forEach((cartItem) => {
    
        const cartListName = document.createElement('li');
  
        const cartImage = document.createElement('img');
        cartImage.src = `assets/icons/${cartItem.id}.svg`;
        cartImage.className = 'cart--item-icon';
        cartImage.alt = `${cartItem.name}`;
  
        const cartName = document.createElement('p');
        cartName.innerText = cartItem.name;
  
        const buttonMinus = document.createElement('button');
        buttonMinus.setAttribute('class', 'quantity-btn remove-btn center');
        buttonMinus.innerText = '-';
    
        const cartQuantity = document.createElement('span');
         cartQuantity.setAttribute('class', 'quantity-text center');
         cartQuantity.innerText = 1;

        const buttonPlus = document.createElement('button');
         buttonPlus .setAttribute('class', 'quantity-btn add-btn center');
         buttonPlus .innerText = '+';
         buttonPlus .value = cartItem.id
    

        cartListName.append(cartImage,cartName,cartQuantity,buttonMinus,buttonPlus);
        cartList.append(cartListName);
    })
  
  
  }
  renderStorelist();
  renderCartList()