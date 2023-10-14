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


//function to show the items in the store form the array
const createStorelist =() => {
  
  //to loop through the items to display
  state.items.forEach(product => {

     // to display the items in the store list 
    const listOfItem = document.querySelector('.store--item-list')
  
    //create a li to store  the item in the store
    const storeList = document.createElement('li')
    
      const storeItemIcon = document.createElement('div')
      storeItemIcon.setAttribute('class','store--item-icon')

        //for the icon
        const productIcon = document.createElement('img')
        productIcon.setAttribute('src',`./assets/icons/${product.id}.svg`)
    
        storeItemIcon.append(productIcon)
    
       //for the button 
       const button = document.createElement('button')
       button.innerText = 'Add to card'

       storeList.append(storeItemIcon)

      storeList.append(button)


      listOfItem.append(storeList)
  })

}
  
createStorelist();
  

