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
          const foundItem = state.cart.find((cartItem)=>cartItem.id === item.id)

          if(foundItem){
            foundItem.quantity++;
          }else{
            state.cart.push({
                id : item.id,
                name : item.name,
                price: item.price,
                quantity: 1,
              })
          }
          renderCartList();
        
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
      console.log(cartList)
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
  
        const buttonRemove = document.createElement('button');
        buttonRemove.setAttribute('class', 'quantity-btn remove-btn center');
        buttonRemove.innerText = '-';
        buttonRemove.addEventListener("click", () => {
          const foundItem = state.cart.find(
            (cartList) => cartList.id === cartItem.id
          );
          if (foundItem.quantity >= 1) {
            foundItem.quantity--;
          }else if(foundItem.quantity === 0){
            state.cart = state.cart.filter((product) => cartItem.id !== foundItem.id);
          }
          renderCartList();
        });
        const span = document.querySelector(".total-number");
          const total = state.cart.reduce((total,cartItem) => {
            return total + cartItem.price * cartItem.quantity }, 0)
            span.innerText = "£" + total.toFixed(2)
        
    
        const cartQuantity = document.createElement('span');
        cartQuantity.innerText = cartItem.quantity;
         cartQuantity.setAttribute('class', 'quantity-text center');

        const buttonAdd = document.createElement('button');
         buttonAdd .setAttribute('class', 'quantity-btn add-btn center');
         buttonAdd .innerText = '+';
         buttonAdd.addEventListener("click", () => {
          const foundItem = state.cart.find(
            (cartList) => cartList.id === cartItem.id
          );
          if (foundItem) {
            foundItem.quantity++;
          }
          renderCartList();
        });
      
        cartListName.append(cartImage,cartName,buttonRemove,cartQuantity,buttonAdd);
        cartList.append(cartListName);
    })
  
  
  }

  renderStorelist();
  renderCartList()