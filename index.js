const storeList = document.querySelector('#store')
const cartItems = document.querySelector('#cart')
const storeItemList = document.querySelector('.store--item-list')
const cartItemList = document.querySelector('cart--item-icon')
const cartList = document.querySelector('#cartItemList')


document.addEventListener('DOMContentLoaded', function () {    
    const items = state.items
    const cart = state.cart
    storeItems(items)
    
});


function storeItems(items) {
    storeItemList.innerHTML = ''

    items.forEach(item => {
        const listItem = document.createElement('li')
        const itemIcon = document.createElement('img')
        const addToCartButton = document.createElement('button')

        const filename = `${item.id}.svg`
    
        itemIcon.src = `./assets/icons/${filename}` //herer skkl
        itemIcon.alt = 'items.name'

        addToCartButton.classList.add('add-to-cart-btn')
       
        addToCartButton.textContent = 'Add to cart'

        //"Add to cart" button will work with
        addToCartButton.addEventListener('click', function() {
           addItemToCart(item)
        })

        listItem.appendChild(itemIcon)
        listItem.appendChild(addToCartButton)

        storeItemList.appendChild(listItem)
   
    })
    
}


function addItemToCart (item) {
    debugger;
    const newItem = document.createElement('li')

    //create the img element
    const imgCart = document.createElement('img')
    imgCart.classList.add('cart--item-icon')
    imgCart.src = "/assets/icons/"+item.id+".svg" //this place fjkfkfkfkfk
    imgCart.alt = "beetroot"

//create the p element 
const pCart = document.createElement('p')
pCart.textContent = item.name

//create the remove button 
const removeButton = document.createElement('button')
removeButton.classList.add('quantity-btn', 'remove-btn', 'center')
removeButton.textContent = '-'

//create the span element 
const quantitySpan = document.createElement('span')
quantitySpan.classList.add('quantity-text', 'center')
quantitySpan.textContent = '1'

//create the add button 
const addButton = document.createElement('button')
addButton.classList.add('quantity-btn', 'add-btn', 'center')
addButton.textContent = '+'

//Append all
newItem.appendChild(imgCart)
newItem.appendChild(pCart)
newItem.appendChild(removeButton)
newItem.appendChild(quantitySpan)
newItem.appendChild(addButton)


const cartList = document.querySelector('#cartItemList')
    cartList.appendChild(newItem)

}
const numberOfItems = ''

for (let i = 0; i < numberOfItems; i++) {
    addItemToCart(item)
}





