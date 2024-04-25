
//This is my code!!
const items = state.items
let cart = state.cart
cart.push(items)

console.log(cart)




function storeItems() {
    const storeItemList = document.querySelector('.store--item-list')

    storeItemList.innerHTML = ''
    
    items.forEach(item => {
        const li = document.createElement('li')
        const imgIcon = document.createElement('img')
       
        imgIcon.src = `./assets/icons/${item.id}.svg`
        imgIcon.alt =  item.name
        
        //img icon buttons
        const buttonIcon = document.createElement('button') 
        buttonIcon.textContent = 'add to cart'
        
        li.append(imgIcon)
        li.append(buttonIcon)
        
        storeItemList.append(li)
       
    })
}

storeItems() 

function myCart (){
        const cartList = document.querySelector('.cart--item-list')
                cartList.innerHTML = ''
        
       items.forEach(item => {
        const listCart = document.createElement('li')
        const cartImage = document.createElement('img')
        cartImage.classList.add ('cart--item-icon')

        cartImage.src = `./assets/icons/${item.id}.svg`
        cartImage.alt = item.name

        const p = document.createElement('p')
        p.textContent = item.name

        const removeCartButton = document.createElement('button')
        removeCartButton.classList.add('remove-btn')
        removeCartButton.textContent = '-'

        const cartSpan = document.createElement('span')
        cartSpan.classList.add('counter')
        cartSpan.textContent = '1'

        const addCartButton = document.createElement('button')
        addCartButton.classList.add('add-btn')
        addCartButton.textContent = '+'

        
        cartList.append(listCart)
        listCart.append(cartImage)
        listCart.append(p)
        listCart.append(removeCartButton)
        listCart.append(cartSpan)
        listCart.append(addCartButton)

       })
       
}
myCart()

