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

document.getElementsByClassName('store--item-list')[0].innerHTML = 
    createAllItems(state.items).join('')

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