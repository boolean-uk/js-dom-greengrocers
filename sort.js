//sort by price  - does nothing, since all prices are the same (which I only noticed after I'd written the code *facepalm)
//sort alphabetically
//reset



// GENERATES AND RENDERS THE SELECT ELEMENT

const sortOptions = ['reset', 'sort alphabetically', 'sort by price: low to high']

sortOptions.forEach( (option) => {

    const button = document.createElement('button')
    store.prepend(button)
    button.setAttribute('style', 'display: inline-block; position: sticky; top: 0; font-size: 11px; font-variant: small-caps; font-weight:bold; background-color:  #e7f4eadd; box-shadow: 2px 2px 2px grey; padding-right: 3px')
    //probably not the best or cleanest way to style things - I guess the better practice would be to create a class, assign it here, then set its properties in one of the css files.
    button.innerText = option
    //there's probably a much better way to set ids, using a single letter seems like a bad idea, but for the purpose of moving on with the exercise, I went with: 
    button.setAttribute('id', `${option[option.length-1]}`)
})





// had to Google code examples for this - somehow, the implementation of .sort() (and therefore .toSorted()) had me confused, went for following along and trying to adapt the code I stumbled upon to wrap my hear around that one
const sortItemsBasedOnName = (array) => {

    const sortedArray = array.toSorted((a, b) => {
        if (a.name > b.name) {
         return 1
        } 
       
        if (a.name < b.name) {
         return -1
        }

    return 0 

    })

    return sortedArray
}

// this is how I'd further adapt it to try to sort by price 
// with this adaptation, it would make sense to merge it with the .name version and add a 'property' parameter
const sortItemsBasedOnPrice = (array) => {

    const sortedArray = array.toSorted((a, b) => {
        if (a.price > b.price) {
         return 1
        } 
       
        if (a.price < b.price) {
         return -1
        }

    return 0 

    })

    return sortedArray
}



const sortByPrice = document.querySelector('#h')
const sortAZ = document.querySelector('#y')
const sortReset = document.querySelector('#t')

sortAZ.addEventListener('click', () => {

   const sorted = sortItemsBasedOnName(state.items)
   state.sorted = sorted
   removePreviousStoreContent()
   populateStoreItemList(state.sorted)

})

sortReset.addEventListener('click', () => {

    removePreviousStoreContent()
    populateStoreItemList(state.items)
 
 })


 sortByPrice.addEventListener('click', () => {

    const sorted = sortItemsBasedOnPrice(state.items)
    state.sorted = sorted
    removePreviousStoreContent()
    populateStoreItemList(state.sorted)

 })