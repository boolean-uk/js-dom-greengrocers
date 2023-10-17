const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};

const imageSources = [
  './assets/icons/001-beetroot.svg',
  './assets/icons/002-carrot.svg',
  './assets/icons/003-apple.svg',
  './assets/icons/004-apricot.svg',
  './assets/icons/005-avocado.svg',
  './assets/icons/006-bananas.svg',
  './assets/icons/007-bell-pepper.svg',
  './assets/icons/008-berry.svg',
  './assets/icons/009-blueberry.svg',
  './assets/icons/010-eggplant.svg'
];

// render item in the store
const renderHeader = () => {
const header = document.querySelector('ul')
console.log(header)

 // loop through everything in the state.items
state.items.forEach((item,index)=>{
    const li=document.createElement('li')
    const div=document.createElement('div')
    div.setAttribute('class','store--item-icon')
    const img=document.createElement('img')
    img.src=imageSources[index]
    img.alt= item.id
    const button =document.createElement('button')
    button.innerText ='Add to cart'
    div.append(img)
    li.append(div)
    li.append(button)
    header.append(li)
 
   button.addEventListener('click',()=>{
      const cart = document.getElementById('cart')
      console.log('cart clicked',cart)
      const cartDiv =document.querySelector('.cart--item-list-container')
      const cartUl = document.querySelector('.cart--item-list')

      const li = document.createElement('li')
      const img = document.createElement('img') 
      img.class = 'cart--item-icon'
      //img.src = 'assets/icons/001-beetroot.svg'
      img.src=imageSources[index]
      img.alt = item.id
      li.append(img)
      const p = document.createElement('p')
      //p.innerText = 'beetroot'
      p.innerText = `${item.name}`
      li.append(p)
      //for remove button
      const removeButton = document.createElement('button')
      removeButton.setAttribute =  'class','quantity-btn remove-btn center'
      removeButton.innerText = '-'
      li.append(removeButton)
      
      // for counter
      const counterNumber = document.createElement('strong')
      counterNumber.setAttribute = 'class','quantity-text center'
      counterNumber.innerText = '0'
      li.append(counterNumber)
      
      // for add button
      const addButton = document.createElement('button')
      addButton.setAttribute = 'class','quantity-btn  add-btn center'
      addButton.innerText = '+'
      //add button value
      //addButton.class = items.quantity
     // console.log(state)
     //addButton.addEventListener('click',(event)=>{
      
     //})
      li.append(addButton)
      cartUl.append(li)
      cartDiv.append(cartUl)
      cart.append(cartDiv)

      // for total
     const totalSection = document.querySelector('.total-section')
    cart.append(totalSection)

     // for  amount 
     const totalNumber = document.querySelector('.total-number')
     cart.append(totalSection)
    
  })
})
}


renderHeader()

