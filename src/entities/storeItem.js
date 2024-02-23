class StoreItem {
    constructor(item) {
        this.id = item.id
        this.name = item.name
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

    #render () {
        this.documentObjects = {}
        this.documentObjects.main = document.createElement('li')
        this.documentObjects.img = this.#renderImg()
        this.documentObjects.addButton = this.#renderAddButton()
        this.documentObjects.main.append(this.documentObjects.img)
        this.documentObjects.main.append(this.documentObjects.addButton)
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