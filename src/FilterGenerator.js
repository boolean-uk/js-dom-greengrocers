function filterByType() {
    const parent = document.getElementById("options-container")

    const filterContainer = document.createElement("div")
    filterContainer.id = "filter--container"

    const filterText = document.createElement("p")
    filterText.textContent = "Filter by category:"
    filterContainer.appendChild(filterText)

    const filterSelection = document.createElement("form")
    filterSelection.type = "checkbox"

    const [filterFruitInput, filterFruitLabel] = CreateFormInputElement("Fruit")
    filterFruitInput.id = "SelectFruits"
    filterFruitInput.defaultChecked = true
    AppendClickListener(filterFruitInput)

    filterSelection.appendChild(filterFruitInput)
    filterSelection.appendChild(filterFruitLabel)
    filterSelection.appendChild(document.createElement("br"))

    const [filterVegetableInput, filterVegetableLabel] = CreateFormInputElement("Vegetable")
    filterVegetableInput.id = "SelectVegetables"
    filterVegetableInput.defaultChecked = true
    AppendClickListener(filterVegetableInput)

    filterSelection.appendChild(filterVegetableInput)
    filterSelection.appendChild(filterVegetableLabel)

    filterContainer.appendChild(filterSelection)

    parent.prepend(filterContainer)
}

function CreateFormInputElement(text) {
    const elementLabel = document.createElement("label")
    elementLabel.textContent = " " + text
    const elementInput = document.createElement("input")
    elementInput.type = "checkbox"


    return [elementInput, elementLabel]
}

function AppendClickListener(InputElement) {
    InputElement.addEventListener("click", () => {
        if (InputElement.value === "on") {
            InputElement.value = "off"
            PopulateCurrentSelection()
        } else {
            InputElement.value = "on"
            PopulateCurrentSelection()
        }
    })
}