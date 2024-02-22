export function populateItems(selector, state) {
    const container = document.querySelector(selector)
    if (container)
    {
        const itemsFragment = document.createDocumentFragment();
        let createdItems

        if (selector === '.item-list.store--item-list')
        {
            createdItems = createAllInventoryItems(state)
        } else createdItems = createAllCartItems(state)

        createdItems.forEach(item => itemsFragment.appendChild(item));
        container.appendChild(itemsFragment);
    }

    console.log(state)
}

function createAllInventoryItems(state) {
    return state.items.map(item => {
        const li = document.createElement('li')

        const div = document.createElement('div')
        div.className = 'store--item-icon'

        const img = document.createElement('img')
        img.src = `assets/icons/${item.id}.svg`
        img.alt = item.name
        div.appendChild(img)
        li.appendChild(div)

        const addButton = document.createElement('button')
        addButton.textContent = 'Put in cart'
        addButton.addEventListener('click', function () {
            const existingCartItemIndex = state.cart.findIndex(cartItem => cartItem.id === item.id);
            let cartItem
            if (existingCartItemIndex === -1)
            {
                cartItem = Object.assign({}, item, { quantity: 1 });
                state.cart.push(cartItem);
            }
            else
            {
                cartItem = state.cart[existingCartItemIndex]
                cartItem.quantity++
            }
            document.dispatchEvent(new CustomEvent('cartUpdated'));
        });


        li.appendChild(addButton)

        return li;
    });
}

function createAllCartItems(state) {

    document.querySelector('.cart--item-list').innerHTML = ''

    return state.cart.map(item => {

        const li = document.createElement('li')

        const img = document.createElement('img')
        img.className = `cart--item-icon`
        img.src = `assets/icons/${item.id}.svg`
        img.alt = item.name
        li.appendChild(img)

        const p = document.createElement('p')
        p.textContent = item.name
        li.appendChild(p)

        const removeButton = document.createElement('button')
        removeButton.className = 'quantity-btn remove-btn center'
        removeButton.textContent = '-'
        removeButton.addEventListener('click', function () {

            const newQuantity = parseInt(span.textContent, 10) - 1;
            span.textContent = newQuantity.toString();

            const index = state.cart.findIndex(cartItem => cartItem.id === item.id)
            newQuantity > 0 ? item.quantity = newQuantity : delete state.cart[index]

            document.dispatchEvent(new CustomEvent('cartUpdated'));
        })
        li.appendChild(removeButton)

        const span = document.createElement('span')
        span.className = 'quantity-text center'
        span.textContent = item.quantity
        li.appendChild(span)

        const addButton = document.createElement('button')
        addButton.className = 'quantity-btn add-btn center';
        addButton.textContent = '+'
        addButton.addEventListener('click', function () {

            const newQuantity = parseInt(span.textContent, 10) + 1;
            item.quantity = newQuantity;
            span.textContent = newQuantity.toString();

            document.dispatchEvent(new CustomEvent('cartUpdated'));
        })
        li.appendChild(addButton)

        return li
    });
}