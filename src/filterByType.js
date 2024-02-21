function filterByType() {
    const parent = document.getElementById("item-list--container")

    const filterContainer = document.createElement("div")
    filterContainer.classList.add("filter--container")

    const filterText = document.createElement("p")
    filterText.textContent = "Filter by category:"
    filterContainer.appendChild(filterText)

    const filterSelection = document.createElement("form")
    filterSelection.type = "checkbox"

    const filterFruitLabel = document.createElement("label")
    filterFruitLabel.textContent = " Fruit"
    const filterFruitInput = document.createElement("input")
    filterFruitInput.type = "checkbox"
    filterFruitInput.id = "SelectFruits"
    filterFruitInput.defaultChecked = true
    filterFruitInput.addEventListener("click", () => {
        if (filterFruitInput.value === "on") {
            filterFruitInput.value = "off"
            PopulateCurrentSelection()
        } else {
            filterFruitInput.value = "on"
            PopulateCurrentSelection()
        }
    })

    filterSelection.appendChild(filterFruitInput)
    filterSelection.appendChild(filterFruitLabel)
    filterSelection.appendChild(document.createElement("br"))

    const filterVegetableLabel = document.createElement("label")
    filterVegetableLabel.textContent = " Vegetable"
    const filterVegetableInput = document.createElement("input")
    filterVegetableInput.type = "checkbox"
    filterVegetableInput.id = "SelectVegetables"
    filterVegetableInput.defaultChecked = true
    filterVegetableInput.addEventListener("click", () => {
        if (filterVegetableInput.value === "on") {
            filterVegetableInput.value = "off"
            PopulateCurrentSelection()
        } else {
            filterVegetableInput.value = "on"
            PopulateCurrentSelection()
        }
    })

    filterSelection.appendChild(filterVegetableInput)
    filterSelection.appendChild(filterVegetableLabel)

    filterContainer.appendChild(filterSelection)

    parent.prepend(filterContainer)
}