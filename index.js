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
  
  // //select the ul element
  // const ul = document.querySelector(".item-list")
    
  //   //create li elements in the ul for each item
  //   let li = document.createElement("li")
  //   console.log(li)
    
  //   const imgDiv = document.createElement("div")
  //   imgDiv.className = "store--item-icon"
  //   li.append(imgDiv)
    
    
  //   const img = document.createElement("img")
  //   img.src = "assets/icons/001-beetroot.svg"
  //   imgDiv.append(img)
    
  //   const button = document.createElement("button")
  //   button.innerHTML = "Add to Cart!"
  //   li.append(button)
    
  //   ul.append(li)
    

// array of images
    
  const images = [
    {
      src: "assets/icons/001-beetroot.svg",
      buttonText: "Add to Cart!"
    },
    {
      src: "assets/icons/002-carrot.svg",
      buttonText: "Add to Cart!"
    },
    {
      src: "assets/icons/003-apple.svg",
      buttonText: "Add to Cart!"
    },
    {
      src:"assets/icons/004-apricot.svg",
      buttonText: "Add to Cart!",
    },
    {
      src:"assets/icons/005-avocado.svg",
      buttonText: "Add to Cart!",
    },
    {
      src:"assets/icons/006-bananas.svg",
      buttonText: "Add to Cart!",
    },
    {
      src:"assets/icons/007-bell-pepper.svg",
      buttonText: "Add to Cart!",
    },
    {
      src:"assets/icons/008-berry.svg",
      buttonText: "Add to Cart!",
    },
    {
      src:"assets/icons/009-blueberry.svg",
      buttonText: "Add to Cart!",
    },
    {
      src:"assets/icons/010-eggplant.svg",
      buttonText: "Add to Cart!",
    }
  ];
  
  // function to display the images
  
  function displayImages(images) {
    const ul = document.querySelector(".item-list");
    console.log(images)
    images.forEach((image, index) => {
      const li = document.createElement("li");
      
      const imgDiv = document.createElement("div")
      li.append(imgDiv)
      
      const img = document.createElement("img");
      img.src = image.src;
      imgDiv.append(img);
      
      const button = document.createElement("button");
      button.innerHTML = image.buttonText;
      button.addEventListener("click", () => {
        cartlist(state.items[index])
      })
      li.append(button);
      
      
      ul.append(li);
     
    });
  }
  
  displayImages(images);
  

// adding items to cart

  function cartlist(item) {
    const cartList = document.querySelector(".item-list.cart--item-list");
    console.log(item)
    
    const chLi = document.createElement("li");
  
    const cartImg = document.createElement("img");
    cartImg.setAttribute('src', `assets/icons/${item.id}.svg`)
    cartImg.className = "cart--item-icon";
    chLi.append(cartImg);
  
    const itemName = document.createElement("p");
    itemName.innerText = item.name;
    chLi.append(itemName);

    const removeButton = document.createElement("button");
    removeButton.innerText = "-"
    removeButton.className = "quantity-btn remove-btn center"
    chLi.append(removeButton);
    cartList.append(chLi);
  
    const itemPrice = document.createElement("span");
    itemPrice.innerText = 1
    itemPrice.className = "quantity-text center"
    chLi.append(itemPrice);

    const addButton = document.createElement("button");
    addButton.innerText = "+"
    addButton.className = "quantity-btn add-btn center"
    chLi.append(addButton);
    cartList.append(chLi);
      
  }

  
  

//create a div with and img inside and a button on each shop item
//and a add to cart button
