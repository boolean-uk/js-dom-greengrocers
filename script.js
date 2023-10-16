console.log(state, "this is the state")

//STORE ITEMS
// Render the store items
// In header add items

// 1. select the ul "item list"
// 2. create forEach loop
//    inside forEach loop:
//    - create li element
//    - append li to ul
//    - create div -- add class
//    - append div to li
//    - create img -- add src(asset folder) and alt
//    - append img to div
//    - create button -- add text 
//    - append button to li

//CART ITEMS
// 1. When the addToCartButton is clicked, then the items should appear in the cart.


// 2. select the ul "item-list"
// 3. create li
//      append li to ul
// 4. create images -- class, src, alt
//      append img to li
// 5. create para --enter name
//      append p to li
// 6. create button -- add class, text
//      append button to li
// 7. create span -- class, text
//      append span to li
// 8. create button -- add class, text
//      append button to li

// ADD EVENT LISTENERS TO ADD AND MINUS BUTTONS
// Minus button
// 1. add event listener to minus button
// 2. inside event listener
//  if item is exisiting in the cart, increase the quantity(span)

////////////////////////////////////////////////////////////
// Actual code
// 1. select the ul "item list"

const ulItemStore = document.querySelector(".item-list")


// 2. create forEach loop
state.items.forEach((eachItem) => {
    // create li element
    const storeLi = document.createElement('li')


    // create div -- add class
    const divItemStore = document.createElement('div')
    divItemStore.setAttribute("class", "store--item-icon")
    // append div to li
    storeLi.append(divItemStore)

    // create img -- add src(asset folder) and alt
    const storeImgs = document.createElement('img')
    // storeImgs.setAttribute("src", `assets/icons/${eachItem.id}.svg`)
    storeImgs.alt = eachItem.name
    storeImgs.src = `assets/icons/${eachItem.id}.svg`
    //append img to div
    divItemStore.append(storeImgs)

    //create button -- add text 
    const addToCartButton = document.createElement('button')
    addToCartButton.innerText = 'Add to cart'
    //append button to li
    storeLi.append(addToCartButton)

    // append li to ul
    ulItemStore.append(storeLi)

    ///////////////////////////////////////////////////////////

    // CART - plan at the top
    // 1. Add event listener

    addToCartButton.addEventListener('click', () => {

        // 2. select the ul "item-list"
        const mainDiv = document.querySelector(".cart--item-list-container > .item-list ")
        console.log(mainDiv)

        // 3. create li
        const itemListLIs = document.createElement('li')
        mainDiv.append(itemListLIs)

        //4. create images -- class, src, alt
        const cartImg = document.createElement('img')
        cartImg.setAttribute("class",
            "cart--item-icon")
        cartImg.src = `assets/icons/${eachItem.id}.svg`

        cartImg.alt = eachItem.name
        itemListLIs.append(cartImg)

        //5. create para --enter name
        const cartPara = document.createElement('p')
        cartPara.innerText = eachItem.name
        itemListLIs.append(cartPara)

        // 6. create button -- add class, text
        const cartButtonMinus = document.createElement('button')
        cartButtonMinus.setAttribute("class", "quantity-btn remove-btn center")
        cartButtonMinus.innerText = "-"
        itemListLIs.append(cartButtonMinus)



        // 7. create span -- class, text
        const spanForCart = document.createElement('span')
        spanForCart.setAttribute("class", "quantity-text center")
        spanForCart.innerText = '1'
        itemListLIs.append(spanForCart)

        // 8. create button -- add class, text
        const cartButtonAdd = document.createElement('button')
        cartButtonAdd.setAttribute("class", "quantity-btn add-btn center")
        cartButtonAdd.innerText = '+'
        itemListLIs.append(cartButtonAdd)

        // Total

        let number = parseInt(spanForCart.innerText)
        spanForCart.innerText = number
        let totalNum = document.querySelector(".total-number")


        totalNum.innerText = eachItem.price * number
        console.log(totalNum)

        ////////////////////////////////////////////////////

        //ADD EVENT LISTENERS TO MINUS AND PLUS BUTTON
        // MINUS

        cartButtonAdd.addEventListener("click", () => {
            // Increase Number by 1 each time when you click plus
            number++

            // Total
            let totalNum = document.querySelector(".total-number")


            totalNum.innerText = eachItem.price * number
            console.log(totalNum)
        })

        cartButtonMinus.addEventListener("click", () => {
            let number = parseInt(spanForCart.innerText)
            if (number <= 1) {
                itemListLIs.remove()
            }
            number--
            spanForCart.innerText = number

            // Total
            let totalNum = document.querySelector(".total-number")


            totalNum.innerText = eachItem.price * number
            console.log(totalNum)

        })
    })


    //ADD EVENT LISTENERS TO MINUS AND PLUS BUTTON
    // ADD



    /////////////////////////////////////////////
    // TOTAL SECTION

    // Get the total-number
    // total-number x price 




});






