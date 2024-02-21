function CreateStoreItemSorteringButtons() {
    const parent = document.getElementById("options-container")
  
    const buttonContainer = document.createElement("div")
    buttonContainer.classList.add("sort-button--container")
  
    const sortByPriceButtonAscending = CreateButtonElement()
    sortByPriceButtonAscending.textContent = "Price ↓"
    sortByPriceButtonAscending.addEventListener("click", () => {
      state.itemsMatchingFilter.sort((a, b) => a.price - b.price)
      GenerateItemList()
    })
  
    const sortByPriceButtonDescending = CreateButtonElement()
    sortByPriceButtonDescending.textContent = "Price ↑"
    sortByPriceButtonDescending.addEventListener("click", () => {
      state.itemsMatchingFilter.sort((a, b) => b.price - a.price)
      GenerateItemList()
    })
    
    const sortByNameButtonAscending = CreateButtonElement()
    sortByNameButtonAscending.textContent = "Alph ↑"
    sortByNameButtonAscending.addEventListener("click", () => {
      state.itemsMatchingFilter.sort((a, b) => a.name < b.name)
      GenerateItemList()
    })
  
    const sortByNameButtonDescending = CreateButtonElement()
    sortByNameButtonDescending.textContent = "Alph ↓"
    sortByNameButtonDescending.addEventListener("click", () => {
      state.itemsMatchingFilter.sort((a, b) => a.name > b.name)
      GenerateItemList()
    })
  
    const textElement = document.createElement("p")
    textElement.textContent = "Sort by"
    textElement.style.textAlign = "center"
  
    buttonContainer.appendChild(textElement)
    buttonContainer.appendChild(sortByPriceButtonAscending)
    buttonContainer.appendChild(sortByPriceButtonDescending)
    buttonContainer.appendChild(sortByNameButtonAscending)
    buttonContainer.appendChild(sortByNameButtonDescending)
  
    parent.appendChild(buttonContainer)
}

function CreateButtonElement() {
  const buttonElement = document.createElement("button")
  buttonElement.classList.add("sort-button")

  return buttonElement
}