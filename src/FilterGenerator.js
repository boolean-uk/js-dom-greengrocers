/**
 * Generate and attach a form with interactable buttons that indicate if a type of produce should be included or excluded from the list generated in PopulateCurrentSelection().
 */
function filterByType() {
    const parent = document.getElementById("options-container")

    const filterContainer = document.createElement("div")
    filterContainer.id = "filter--container"

    const filterText = document.createElement("p")
    filterText.textContent = "Filter by category:"
    filterContainer.appendChild(filterText)

    const filterSelection = document.createElement("form")
    filterSelection.type = "checkbox"

    const [fruitInput, fruitLabel] = CreateFormInputElement("Fruit")
    fruitInput.id = "SelectFruits"
    fruitInput.defaultChecked = true
    AppendClickListener(fruitInput)

    filterSelection.appendChild(fruitInput)
    filterSelection.appendChild(fruitLabel)
    filterSelection.appendChild(document.createElement("br"))

    const [vegetableInput, vegetableLabel] = CreateFormInputElement("Vegetable")
    vegetableInput.id = "SelectVegetables"
    vegetableInput.defaultChecked = true
    AppendClickListener(vegetableInput)

    filterSelection.appendChild(vegetableInput)
    filterSelection.appendChild(vegetableLabel)

    filterContainer.appendChild(filterSelection)

    parent.prepend(filterContainer)
}

/**
 * Generate and configure both a label and a input element as checkbox type.
 * @param {string} text The desired text on the label part of the form element
 * @returns Elements created and configured in the form of a [inputElement, labelElement] array.
 */
function CreateFormInputElement(text) {
    const elementLabel = document.createElement("label")
    elementLabel.textContent = " " + text
    const elementInput = document.createElement("input")
    elementInput.type = "checkbox"


    return [elementInput, elementLabel]
}

/**
 * Attach a event listener that both set the element value ("on"/"off") and repopulates the current selection state array.
 * @param {HTMLInputElement} InputElement The input element to attach a click listener to.
 */
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