console.log(state)

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


// Actual code
// 1. select the ul "item list"

const ulItemStore = document.querySelector(".item-list")
console.log(ulItemStore, "this is the ul")

// 2. create forEach loop
state.items.forEach((eachItem) => {
    // console.log(state)

    // create li element
    const storeLi = document.createElement('li')

    // append li to ul
    ulItemStore.append(storeLi)
    // console.log(storeLi)

    // create div -- add class
    const divItemStore = document.createElement('div')
    divItemStore.setAttribute("class", "store--item-icon")
    // append div to li
    storeLi.append(divItemStore)

    // create img -- add src(asset folder) and alt
    const storeImgs = document.createElement('img')
    storeImgs.setAttribute("src", `assets/icons/${eachItem.name}`)
    //append img to div
    divItemStore.append(storeImgs)

    //create button -- add text 
    const addToCartButton = document.createElement('button')
    addToCartButton.innerText = 'Add to cart'
    //append button to li
    storeLi.append(addToCartButton)

});