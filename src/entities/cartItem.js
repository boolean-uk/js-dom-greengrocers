class CartItem {
    
    constructor(item) {
        this.id = item.id
        this.name = item.name
        this.price = item.price
        this.quantity = 1
        this.imgURL = 'assets/icons/' + item.id + '.svg'
        this.documentObjects = null
    }

    getDocumentObject() {
        if (this.documentObjects === null) {
            this.#render()
        }
        return this.documentObjects.main
    }

    removeDocumentObject() {
        this.documentObjects.main.remove()
        this.documentObjects = null
    }

    incrementQuantity() {
        this.quantity++
        this.#rerender();
    }

    decrementQuantity() {
        this.quantity = Math.max(this.quantity-1, 0)
        this.#rerender()
    }

    getTotalPrice() {
        return this.price * this.quantity
    }

    #render() {
        this.documentObjects = {}
        this.documentObjects.main = document.createElement('li')
        this.documentObjects.img = this.#renderImg()
        this.documentObjects.name = this.#renderName()
        this.documentObjects.decrementButton = this.#renderDecrementButton()
        this.documentObjects.quantity = this.#renderQuantity()
        this.documentObjects.incrementButton = this.#renderIncrementButton()
        this.documentObjects.main.append(this.documentObjects.img)
        this.documentObjects.main.append(this.documentObjects.name)
        this.documentObjects.main.append(this.documentObjects.decrementButton)
        this.documentObjects.main.append(this.documentObjects.quantity)
        this.documentObjects.main.append(this.documentObjects.incrementButton)
    }

    #rerender() {
        this.documentObjects.quantity.innerText = this.quantity
    }

    #renderImg() {
        const img = document.createElement('img')
        img.classList.add('cart--item-icon')
        img.src = this.imgURL
        img.alt = this.name
        return img
    }

    #renderName() {
        const p = document.createElement('p')
        p.innerText = this.name
        return p
    }

    #renderQuantity() {
        const span = document.createElement('span')
        span.classList.add('quantity-text', 'center')
        span.innerText = this.quantity
        return span
    }

    #renderIncrementButton() {
        const button = document.createElement('button')
        button.classList.add('quantity-btn', 'add-btn', 'center')
        button.innerText = "+"
        return button
    }

    #renderDecrementButton() {
        const button = document.createElement('button')
        button.classList.add('quantity-btn', 'remove-btn', 'center')
        button.innerText = "-"
        return button
    }
}