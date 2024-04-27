const items = state.items //stored state.items inside items
const cart = state.cart //stored state.cart inside cart

function storeItems() { //started writing my function to store list Items in the header
    const storeItemList = document.querySelector('.store--item-list') //I selected .store--item-list and saved it inside StoreItemsList

    storeItemList.innerHTML = '' // I set the storeItemList empty

    items.forEach(item => { //I did for loop here to iterate the below
        const li = document.createElement('li') //I crreated li
        const imgIcon = document.createElement('img') // I created image for the icons

        imgIcon.src = `./assets/icons/${item.id}.svg` //I kind of get the images inside the data.js
        imgIcon.alt = item.name //I got the name withh this

        // img icon buttons
        const buttonIcon = document.createElement('button') //I got button
        buttonIcon.textContent = 'add to cart' //The text for, I could change it anytime I want

        // Add click event listener to add item to cart
        buttonIcon.addEventListener('click', () => { //I did an eventlistener to to be able to click, the button I created
            addToCart(item) // I passed item inside the addToCart
        });

        li.append(imgIcon) //I put ImgIcon inside li
        li.append(buttonIcon) // Did same to buttonIcon

        storeItemList.append(li) // Put li inside StoreItemList
    })
}
storeItems() //I called storeItems here

function myCart() { //I created myCart function 
    const cartList = document.querySelector('.cart--item-list') //Select .cart--item-list and store it inside cartList

    cartList.innerHTML = '' //set cartList empty

    cart.forEach((cartItem, index) => { //I did forEach loop, and passed cartItem as an argument
        const listCart = document.createElement('li') //created li element
        const cartImage = document.createElement('img') //did same for image
        cartImage.classList.add('cart--item-icon') // added class Cart Item Icon

        cartImage.src = `./assets/icons/${cartItem.item.id}.svg` //I got the image here, I have to remember that the item.id is now added to the argument cartItem i created
        cartImage.alt = cartItem.item.name //i got the name, cartItem is added 

        const p = document.createElement('p') //create p element
        p.textContent = cartItem.item.name //Now p name is created

        const removeCartButton = document.createElement('button') //remove button is created
        removeCartButton.classList.add('remove-btn') //remove button class created
        removeCartButton.textContent = '-' //the text content created inform of -

        const cartSpan = document.createElement('span') //span element created here
        cartSpan.classList.add('counter') //I added 'counter' class
        cartSpan.textContent =  cartItem.count || 1 // now, the textcontent here now uses .count is added to keep track of the quantity of item, this paved way for my buttons

        const addCartButton = document.createElement('button')// add button created
        addCartButton.classList.add('add-btn') // class added 
        addCartButton.textContent = '+' //text content added

        listCart.append(cartImage) // acrtImage appeneded inside listcart
        listCart.append(p) // same to p
        listCart.append(removeCartButton) //same to removeCartButton
        listCart.append(cartSpan) //same to cartSpan
        listCart.append(addCartButton) // same to addCartButton

        cartList.append(listCart) //listcart added inside cartList that was set to empty

        removeCartButton.addEventListener('click', () => { //now another click eventlistener created
            if (cartItem.count > 1) { //if statetment created, that if cartItem is greater than 1 cart
                cart[index].count-- //see to decrease
                cartSpan.textContent = cartItem.count  //Meanwhile cartSpan.textContent is now set to cartItem.count
            } else { //else
                cart.splice(index, 1) // reduce it by 1 
                listCart.remove() //remove the li
               
            }
            updateCartTotal()
        })

        addCartButton.addEventListener('click', () => { //another eventListener
            if (cartItem.count <= 0) { //now if cartItem.count is now less or equal 0
                cartItem.count = 1 // and cartItem.count is 1 (I thought i could use || here but its not working)
            }
            cartItem.count++ // addCartButton should add 1
            cartSpan.textContent = cartItem.count // same logic to  cartSpan.textContent
        });
    });
}

    
function updateCartTotal() {
    const totalPriceElement = document.querySelector('.total-number')
    let totalPrice = 0

    cart.forEach(cartItem => {
        totalPrice += cartItem.item.price * cartItem.count
    })

    totalPriceElement.textContent = `£${totalPrice.toFixed(2)}`
}

 function addToCart(itemToAdd) { //I created another function addToCartand added itemToAdd as argument
        const existingCartItem = cart.find(cartItem => cartItem.item.id === itemToAdd.id) //Inside cart I found cartItem, and set cartItem.item.id to itemToAa.id, so as to now have same value
        if (existingCartItem) { //Now, If statement 
            
            existingCartItem.count++ //says, if item already exists in cart, increase count
        } else { //else
            const newItem = {...itemToAdd, price: 3}
            cart.push({item: newItem, count: 1}) //// If item doesn't exist in cart, add it with count 1
        }
        console.log(cart)
        updateCartTotal()
        myCart() //called cart again to make it work
    }



