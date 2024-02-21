function GenerateSortButtonsStoreItem() {
    const parent = document.getElementById("sortContainer")
  
    const buttonContainer = document.createElement("div")
    buttonContainer.classList.add("sort-button--container")
  
    console.log(parent)
    const sortByPriceButtonAscending = document.createElement("button")
    sortByPriceButtonAscending.textContent = "Price ↓"
    sortByPriceButtonAscending.classList.add("sort-button")
    sortByPriceButtonAscending.addEventListener("click", () => {
      state.items.sort((a, b) => a.price - b.price)
      GenerateItemList()
    })
  
    const sortByPriceButtonDescending = document.createElement("button")
    sortByPriceButtonDescending.textContent = "Price ↑"
    sortByPriceButtonDescending.classList.add("sort-button")
    sortByPriceButtonDescending.addEventListener("click", () => {
      state.items.sort((a, b) => b.price - a.price)
      GenerateItemList()
    })
    
    const sortByNameButtonAscending = document.createElement("button")
    sortByNameButtonAscending.textContent = "Alph ↑"
    sortByNameButtonAscending.classList.add("sort-button")
    sortByNameButtonAscending.addEventListener("click", () => {
      state.items.sort((a, b) => a.name < b.name)
      GenerateItemList()
    })
  
    const sortByNameButtonDescending = document.createElement("button")
    sortByNameButtonDescending.textContent = "Alph ↓"
    sortByNameButtonDescending.classList.add("sort-button")
    sortByNameButtonDescending.addEventListener("click", () => {
      state.items.sort((a, b) => a.name > b.name)
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

function GenerateSortButtonsStoreItem() {
    const parent = document.getElementById("sortContainer")
  
    const buttonContainer = document.createElement("div")
    buttonContainer.classList.add("sort-button--container")
  
    console.log(parent)
    const sortByPriceButtonAscending = document.createElement("button")
    sortByPriceButtonAscending.textContent = "Price ↓"
    sortByPriceButtonAscending.classList.add("sort-button")
    sortByPriceButtonAscending.addEventListener("click", () => {
      state.items.sort((a, b) => a.price - b.price)
      GenerateItemList()
    })
  
    const sortByPriceButtonDescending = document.createElement("button")
    sortByPriceButtonDescending.textContent = "Price ↑"
    sortByPriceButtonDescending.classList.add("sort-button")
    sortByPriceButtonDescending.addEventListener("click", () => {
      state.items.sort((a, b) => b.price - a.price)
      GenerateItemList()
    })
    
    const sortByNameButtonAscending = document.createElement("button")
    sortByNameButtonAscending.textContent = "Alph ↑"
    sortByNameButtonAscending.classList.add("sort-button")
    sortByNameButtonAscending.addEventListener("click", () => {
      state.items.sort((a, b) => a.name < b.name)
      GenerateItemList()
    })
  
    const sortByNameButtonDescending = document.createElement("button")
    sortByNameButtonDescending.textContent = "Alph ↓"
    sortByNameButtonDescending.classList.add("sort-button")
    sortByNameButtonDescending.addEventListener("click", () => {
      state.items.sort((a, b) => a.name > b.name)
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