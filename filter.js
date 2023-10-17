// RENDER THE FILTER DROPDOWN MENU

const filtersMenu = document.createElement('div')
filtersMenu.setAttribute('id', 'filtersMenu')

const filtersDropdown = document.createElement('select')
filtersMenu.append(filtersDropdown)
filtersDropdown.setAttribute('style', 'position: fixed; left: 10px, top: 70px; box-shadow: 2px 2px 2px grey; border: none')
store.prepend(filtersMenu)


//not sure how good a strategy this is to attempt to keep the code dry - it seems to work, but I wonder what limitations / implications there might be to generating and rendering menus/ nav bars this way.
const filterOptions = ['select filter', 'vegetables', 'fruit', 'all']

filterOptions.forEach((option) => {
  const selectOption = document.createElement('option')
  selectOption.innerText = `${option}`
  selectOption.setAttribute('value', `${option}`)
  filtersDropdown.append(selectOption)
})


//EVENTS

const filterFruit = () => {
  const fruit = state.items.filter(item => item.type === 'fruit')
  state.filtered = fruit
}

const filterVegetables = () => {
  const vegetables = state.items.filter(item => item.type === 'vegetables')
  state.filtered = vegetables
}


filtersDropdown.addEventListener('change', event =>{

  if (event.target.value === 'fruit') {
    filterFruit()
    removePreviousStoreContent()
    populateStoreItemList(state.filtered)
  }

  if (event.target.value === 'vegetables') {
    filterVegetables()
    removePreviousStoreContent()
    populateStoreItemList(state.filtered)
    }

  if (event.target.value === 'all') {
    state.filtered = []
    removePreviousStoreContent()
    populateStoreItemList(state.items)
    }

})