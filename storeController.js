
//Create cart
const cartList = document.querySelector(".cart--item-list")
const storeList = document.querySelector(".store--item-list")

//Get sorting buttons 
const sortAlphabetticlyBtn = document.querySelector(".alphabeticalbtn")
sortAlphabetticlyBtn.addEventListener('click', sortingAlphabetticly)

const sortPriceBtn = document.querySelector(".pricebtn")
sortPriceBtn.addEventListener('click', sortingOnPrice)


main()

function main(){
  createStoreList()
  updateCart()
}

function createStoreList(){


  for (item of state.items) {
    const storeItem = document.createElement("li")

    //create div 
    const imgDiv = document.createElement("div")
    imgDiv.classList.add("store--item-icon")

    //create img
    const itemImage = document.createElement("img") 
    itemImage.src = "assets/icons/" + item.id + ".svg"
    itemImage.alt = item.name 

    //put img in div 
    imgDiv.appendChild(itemImage)

    //create button
    const btn = document.createElement("button")
    btn.classList.add(item.id)
    
    btn.addEventListener('click', function(event) {
        const id = event.currentTarget.classList.value
        addToCart(id)
    });

    btn.innerHTML = "Add to cart"

    //add to store item
    storeItem.append(imgDiv, btn)
  
    console.log(storeItem)
    console.log(imgDiv)

    storeList.append(storeItem)
  }
}

function updateCart(){
    cartList.innerHTML = ''

    state.cart.forEach(item =>{

        console.log(item)
        //create listItem
        const cartItem = document.createElement("li")

        //create img
        const cartItemImage = document.createElement("img") 
        cartItemImage.src = "assets/icons/" + item.id + ".svg"
        cartItemImage.alt = item.name
        cartItemImage.classList.add("cart--item-icon")

        //create name 
        const cartItemName = document.createElement("p") 
        cartItemName.innerHTML = item.name


        const removebtn = document.createElement("button")
        removebtn.classList.add("quantity-btn", "remove-btn", "center" ,item.id)
        removebtn.setAttribute("id", item.id);
        removebtn.innerHTML = "-"
        removebtn.addEventListener('click', function(event) {
            const id = event.currentTarget.getAttribute("id");
            removeFromCart(id)
        });

        const addbtn = document.createElement("button")
        addbtn.classList.add("quantity-btn", "add-btn", "center")
        addbtn.setAttribute("id", item.id);
        addbtn.innerHTML = "+"
        addbtn.addEventListener('click', function(event) {
            const id = event.currentTarget.getAttribute("id");
            addToCart(id)
        });

        const qty = document.createElement("span")
        qty.classList.add("quantity-text", "center")

        qty.innerHTML = item.quantity

        cartItem.append(cartItemImage, cartItemName, removebtn, qty, addbtn)

        cartList.append(cartItem)
        updateTotal()

        });
}


function addToCart(itemId){
    const storeItem = state.items.find(item => item.id === itemId);
    const isItemInCart = state.cart.some(item => item.id === itemId);
    if (isItemInCart){
        const cartItem = state.cart.find(item => item.id === itemId);
        cartItem.quantity += 1
        console.log("is in cart")
        updateCart()

    } else{
        console.log("is not in cart")
        state.cart.push({ ...storeItem, quantity: 1});
        updateCart()       
    }
}

function removeFromCart(itemId){

    const cartItem = state.cart.find(item => item.id === itemId);
    cartItem.quantity -= 1
    if(cartItem.quantity < 1){
        state.cart.pop(state.cart.indexOf(cartItem))
    }
    updateCart()
}

function sortingAlphabetticly() {

      // Sort the array alphabetically by the 'name' property
      state.items.sort((a, b) => a.name.localeCompare(b.name));
      storeList.innerHTML = ' '
      createStoreList()
      
}

function sortingOnPrice(){
    console.log("price")
    state.items.sort((a, b) => a.price - b.price);
    storeList.innerHTML = ' '
    createStoreList()

}

function updateTotal(){
    let total = 0;

    state.cart.forEach(cartItem => {
        const item = state.items.find(item => item.id === cartItem.id);
        if (item) {
            total += item.price * cartItem.quantity;
        }
    });

    // Assuming you have an element with the class "total-number" to display the total
    const totalElement = document.querySelector(".total-number");
    
    // Update the HTML with the new total
    totalElement.innerHTML = `£${total.toFixed(2)}`;
}