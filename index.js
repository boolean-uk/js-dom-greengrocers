const state = {
  items: [
    {
      id: "001-beetroot",
      category: 'vegetables', 
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      category: 'vegetables', 
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      category: 'fruits', 
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      category: 'fruits',
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      category: 'vegetables', 
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      category: 'fruits',
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      category: 'vegetables', 
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      category: 'berries',
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      category: 'berries',
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      category: 'vegetables',  
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: [],
  inventory: []
};

function printStoreItems(){

const storeItems = document.querySelector(".store--item-list")
storeItems.innerHTML = ''
let sortedtArray = sortItems(state.inventory);

sortedtArray.forEach(element => {
     let item = document.createElement('li')
     item.id = element.id;
     let itemDiv = document.createElement('div')
     itemDiv.classList = "store--item-icon"
     let img = document.createElement('img')
     img.src = `assets/icons/${element.id}.svg`
     img.alt = element.name;
     let btn = document.createElement('button')
     btn.innerHTML = 'Add to cart'
     btn.addEventListener('click', ()=>{ 
       state.cart.push(element)
       updateCart();
     })
   
itemDiv.appendChild(img)
item.appendChild(itemDiv)
item.appendChild(btn)
storeItems.appendChild(item)
})

}

//update cart-items
function updateCart(){
let cart = document.querySelector('.cart--item-list')
cart.innerHTML = ''


  for(let j = 0; j<state.cart.length; j++){
    if(state.cart[j].number === undefined)
    {
      state.cart[j].number = 1;
    }

  for(let i = 0; i< state.cart.length; i++ )
    {
      if(state.cart[i].id === state.cart[j].id && (i !== j)){
        state.cart[j].number++;
        delete state.cart.splice(i,1)
        
      }
    }
  }
  

  state.cart.forEach(element =>{
    
  if( element.number > 0){

    const item = document.createElement('li')
    const img = document.createElement('img')
    img.classList = "cart--item-icon"
    img.src = `assets/icons/${element.id}.svg`
    img.alt = element.name;
    const itemName = document.createElement('p')
    itemName.innerHTML = element.name;

    //btnRemove
    const btnRemove = document.createElement('button')
    btnRemove.innerText = '-'
    btnRemove.classList = "quantity-btn remove-btn center";
    btnRemove.addEventListener('click', ()=>{
      element.number--
      updateCart()
    })
    const span = document.createElement('span')
    span.classList = "quantity-text center";
    span.innerHTML = element.number
    span.value = element.number

    //btnAdd
    const btnAdd = document.createElement('button')
    btnAdd.innerText = '+'
    btnAdd.classList = "quantity-btn add-btn center";
    btnAdd.addEventListener('click', ()=>{
      element.number++
      updateCart()
     })

  item.appendChild(img)
  item.appendChild(itemName)
  item.appendChild(btnRemove)
  item.appendChild(span)
  item.appendChild(btnAdd)
  cart.appendChild(item)
 }
  })

updateTotal();
}


//Update totalsum
function updateTotal(){
  const Total = document.querySelector('.total-number')

  let sum = 0
  state.cart.forEach(element =>{
    sum += (element.price * element.number) 

  })
  Total.innerHTML = `£${sum.toFixed(2)}`
}


//filter by ckeckboxes

function filterItems(checkBox){
  const category = checkBox.value.toLowerCase();
  const bool = checkBox.checked;
  const inventorySize = state.inventory.length;
  let inventoryItems = []
    if(bool){ //add items with correct category to inventory
      for(let j = 0; j < state.items.length; j++){
        if(state.items[j].category === category){
          inventoryItems.push(state.items[j])
        }
      }
      inventoryItems = inventoryItems.concat(state.inventory)
    }else{
      for( let i = 0; i < inventorySize; i++){
        if(state.inventory[i].category === category){
        }else{
          inventoryItems.push(state.inventory[i])  
        }
      }
    }

  
 
  state.inventory = inventoryItems;
  printStoreItems(state.inventory);
}

function sortItems(array){
  const status = document.getElementById('SortOption').value
  let sortedArray = []
  switch(status){
    //sort A-Z
    case '0':
    let names = [];
    array.forEach(element =>{
      names.push(element.name)
    });

    names.sort()

    for(let i=0; i<names.length; i++){
     
        array.forEach(item =>{
          if(item.name === names[i]){sortedArray.push(item)}
        })      
    }
    break;
//sort by catergory: beeries, fruits, vegetables
    case '1':
      sortedArray = [[],[],[]]
      array.forEach(element =>{
        if(element.category === 'berries'){
          sortedArray[0].push(element)
        }else if(element.category === 'fruits'){
          sortedArray[1].push(element)
        }else{sortedArray[2].push(element)}
      });
      
      sortedArray = sortedArray.flat();
    break;
    default:
      return array;
  }

  return sortedArray[0] ? sortedArray : array;
}


//function calls
state.inventory = state.items;
printStoreItems();