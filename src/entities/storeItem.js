class StoreItem {
    constructor(item) {
        this.id = item.id
        this.name = item.name
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

    #render () {
        this.documentObject = {}
        this.documentObject.main = document.createElement('li')
        this.documentObject.img = this.#renderImg()
        this.documentObject.addButton = this.#renderAddButton()
        this.documentObject.main.append(this.documentObject.img)
        this.documentObject.main.append(this.documentObject.addButton)
    }

    #renderImg() {
        const div = document.createElement('div')
        div.classList.add('store--item-icon')
        const img = document.createElement('img')
        img.src = this.imgURL
        img.alt = this.name
        div.append(img)
        return div
    }

    #renderAddButton() {
        const btn = document.createElement('button')
        btn.innerText = 'ADD TO CART'
        return btn
    }
}