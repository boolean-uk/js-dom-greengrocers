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

// ---------------CORE REQUIREMENTS PLAN ----------//
// - Implement the following requirements
  "A user can view a selection of items in the store"
  
  // ------List of Initial Constants ------//


  const store = document.querySelector("#store")
  const ulGrocery = document.querySelector(".store--item-list")
  const cartItems = document.querySelector("#cart")
  const cartContainer = document.querySelector(".cart--item-list-container")
  const ulCart = document.querySelector(".cart--item-list")
  const totalPrice = document.querySelector(".total-number")  
  

  // create some array of items
  // create function to select item 
  // append item to store
  // create loop to add new items
  // make new items into a list


  for (let i = 0; i < state.items.length; i++) {

    const liGrocery = document.createElement("li")
    const imgGrocery = document.createElement("img")   
    const btnGrocery = document.createElement("button")

    imgGrocery.setAttribute("src", `assets/icons/${state.items[i].id}.svg`)
    imgGrocery.setAttribute("class", '.store--item-icon')
    imgGrocery.setAttribute("alt", `${state.items[i].name}`)
    
    btnGrocery.innerText = "Add to cart"

    btnGrocery.addEventListener("click", () => {      
        if (!state.cart.includes(state.items[i])) {
          state.items[i].quantity = 1
          state.cart.push(state.items[i])
        } 
        
        else {
        state.items[i].quantity++
        }
        createCart() 
      }
    )
    liGrocery.append(imgGrocery, btnGrocery)
    ulGrocery.append(liGrocery);
    }
    


  "From the store, a user can add an item to their cart"

  // create function to pick item from above list
  // append new item to cart list

  
  function createCart () {
  
    ulCart.innerHTML = ""
  
    for (let i = 0; i < state.cart.length; i++) {
    
      const cartItem = document.createElement("li")
      const cartImg = document.createElement("img")
      const cartName = document.createElement("p")
      const cartRemove = document.createElement("button")
      const cartQuantity = document.createElement("span")
      const cartAdd = document.createElement("button")
  
      cartImg.setAttribute("src", `assets/icons/${state.cart[i].id}.svg`)
      cartImg.setAttribute("class", ".cart--item-icon")
      cartImg.setAttribute("alt", `${state.cart[i].name}`)
  
      cartName.innerText = `${state.cart[i].name}`
      
      "If the item is already in the cart, increase the item's quantity in the cart"
      
      // find duplicate item in cart
      // increase item amount by one for each duplicate (for loop here?)


      cartRemove.setAttribute ("class", ".quantity-btn remove-btn center")
      cartRemove.innerText = "-"
  
      cartQuantity.innerText = `${state.cart[i].quantity}`
      
      cartAdd.setAttribute ("class", ".quantity-btn add-btn center")
      cartAdd.innerText = "+"
      
      "From the cart, a user can view and adjust the number of items in their cart"
    
      // add click event for additional item
      // add click event for reomval of item
      // can above 2 steps be made into one function with else/if statements??


      cartAdd.addEventListener('click', () => {
        state.cart[i].quantity++
        createCart()
      })
      
      "If an item's quantity equals zero it is removed from the cart"
    
          // add if statement that will clear cart but only selected item
      
      
      cartRemove.addEventListener('click', () => {
        if (state.cart[i].quantity > 1) {
          state.cart[i].quantity--
        }
        
        else {
        
          state.cart.splice(i, 1)        

        
        }
  
        createCart() 
        
        }
      )
  
        cartItem.append (cartImg, cartName, cartRemove, cartQuantity, cartAdd)
        ulCart.append (cartItem)
  
    }
  
  }
  





  "A user can view the current total in their cart"

  // add click event AND/OR function that returns sum of cart items

  function priceCalc() {
    const cartPrice = document.createElement("span")

    let total = 0;
    state.cart.forEach((cartItem) => {
      total += cartItem.quantity * cartItem.price;

    });

    totalNumber.innerText = `£${total.toFixed(2)}`;

    cartPrice.append (totalPrice);

  }

  priceCalc ()

  
// ---------------------- EXTENSION ONE ----------------//

"Add filters to the store ie. filter by item type; when a user clicks a filter they will only see items of that type"

// add click event function that will recognise item
// append item to new "selected" list


// ----------------------- EXTENSION 2 ------------------//

"Add sorting to the store ie. sort by price or sort alphabetically; when a user clicks sort they will see a sorted list of items"

// add click event function to arrange "ordered list" numerically "pushing" highest value first going to lowest in "array"???