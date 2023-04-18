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

function listItems(){
  for (let i = 0; i < state.items.length; i++) {
const header = document.querySelector("#store")
const ul = document.querySelector('.item-list')
console.log(ul)
const li = document.createElement('li')
ul.append(li)


// creating div to insert inside li

  const div = document.createElement("div")
  div.setAttribute("class", "store--item-icon")
  li.append(div)
  const img = document.createElement('img')
  img.setAttribute('src','assets/icons/001-beetroot.svg')
  div.append(img)
  

  // const div = document.createElement("div")
  // div.setAttribute("class", "store--item-icon")
  // li.append(div)
  // const imgOne = document.createElement('img')
  // imgOne.setAttribute('src','assets/icons/002-carrot.svg')
  // div.append(imgOne)

  const button = document.createElement("button")
  button.innerText = "add to cart"
  li.append(button)

  // const divOne = document.createElement("div")
  // divOne.setAttribute("class", "store--item-icon")
  // li.append(divOne)
  // const imgOne = document.createElement('img')
  // imgOne.setAttribute('src', 'assets/icons/002-carrot.svg')
  // div.append(imgOne)

  // const imgTwo = document.createElement('img')
  // imgTwo.setAttribute('src', 'assets/icons/003-apple.svg')
  // div.append(imgTwo)

}
}
listItems()


// console.log(li)



// const div = document.createElement('.store--item-icon')
// console.log(div)
// const img = document.createElement('img')
// img.setAttribute('src', 'assets/icons/001-beetroot.svg')
// document.header.append(img)
// const button = document.createElement('button')
// button.setAttribute('button', "add to cart")
// document.header
