class CartItem {
    
    constructor(item) {
        this.id = item.id
        this.name = item.name
        this.price = item.price
        this.quantity = 1
        this.imgURL = 'assets/icons/' + item.id + '.svg'
        this.documentObject = null
    }

    getDocumentObject() {
        if (this.documentObject === null) {
            this.#render()
        }
        return this.documentObject.main
    }

    removeDocumentObject() {
        this.documentObject.main.remove()
        this.documentObject = null
    }

    incrementQuantity() {
        this.quantity++
        this.#updateRender();
    }

    decrementQuantity() {
        this.quantity = Math.max(this.quantity-1, 0)
        this.#updateRender()
    }

    getTotalPrice() {
        return this.price * this.quantity
    }

    #render() {
        this.documentObject = {}
        this.documentObject.main = document.createElement('li')
        this.documentObject.img = this.#renderImg()
        this.documentObject.name = this.#renderName()
        this.documentObject.decrementButton = this.#renderDecrementButton()
        this.documentObject.quantity = this.#renderQuantity()
        this.documentObject.incrementButton = this.#renderIncrementButton()
        this.documentObject.main.append(this.documentObject.img)
        this.documentObject.main.append(this.documentObject.name)
        this.documentObject.main.append(this.documentObject.decrementButton)
        this.documentObject.main.append(this.documentObject.quantity)
        this.documentObject.main.append(this.documentObject.incrementButton)
    }

    #updateRender() {
        this.documentObject.quantity.innerText = this.quantity
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