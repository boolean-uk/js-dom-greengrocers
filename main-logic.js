const createItem = (item) =>
{
    return `<li>
    <div class="store--item-icon">
      <img src="assets/icons/${item.id}.svg" alt=${item.name} />
    </div>
    <button id='${item.name}' 
    onclick="addItem(document.getElementById('${item.name}'))">
        Add to cart
    </button>
  </li>`
}

const createAllItems = (itemList) =>
{
    return itemList.map(i => createItem(i));
}

let currentSelection = state.items;

document.getElementsByClassName('store--item-list')[0].innerHTML = 
    createAllItems(state.items).join('')

let select = document.getElementById('filter');

select.addEventListener("change", (event) =>{
    if (event.target.value == 'all')  
        currentSelection = state.items;

    else
        currentSelection = 
            state.items.filter((item) => item.type == event.target.value);

    document.getElementsByClassName('store--item-list')[0].innerHTML = 
        createAllItems(currentSelection).join('')
});

let order = document.getElementById('order');

order.addEventListener("change", (event) => {
    switch(event.target.value){
        case('alphabetically'):
            currentSelection.sort((a, b) => (a.name > b.name) ? 1 : -1);
            break;
        case('price'):
            currentSelection.sort(function(a, b){return a.price-b.price})
            break;
        default:
            console.log("You should not be here?")
    }
    document.getElementsByClassName('store--item-list')[0].innerHTML = 
        createAllItems(currentSelection).join('')
});

// cart
const addItem = (elm) => {
    let item = state.items.find(s => s.name == elm.id);
    let element = document.getElementById(item.name+'_cart');

    if ( element == null ){
        let text = `<li id='${item.name}_cart'>
        <img
          class="cart--item-icon"
          src="assets/icons/${item.id}.svg"
          alt=${item.name}
        />
        <p>${item.name}</p>
        <button class="quantity-btn remove-btn center"
        onclick = "decrementItem(document.getElementById('${item.name}'))"
        >-</button>
        <span class="quantity-text center" id='${item.name}_counter'>0</span>
        <button class="quantity-btn add-btn center"
        onclick = "incrementItem(document.getElementById('${item.name}'))"
        >+</button>
      </li>
      `
      document.getElementsByClassName('cart--item-list')[0].innerHTML += text; 
    }

    incrementItem(elm);
}

const incrementItem = (elm) => {
    let item = state.items.find(s => s.name == elm.id);

    document.getElementById(item.name+'_counter').innerHTML++;

    let sum = document.getElementsByClassName('total-number')[0];
    sum.innerHTML = sum.innerHTML.charAt(0) + 
        parseFloat(Number(sum.innerHTML.slice(1)) + item.price).toFixed(2);
}

const decrementItem = (elm) => {
    let item = state.items.find(s => s.name == elm.id);

    let counter = document.getElementById(item.name+'_counter');
    counter.innerHTML--;

    let sum = document.getElementsByClassName('total-number')[0];
    sum.innerHTML = sum.innerHTML.charAt(0) +
        parseFloat(Number(sum.innerHTML.slice(1)) - item.price).toFixed(2);

    if ( counter.innerHTML == 0){
        document.getElementById(item.name+'_cart').remove();
    }
}