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

const ShopItemList = document.querySelector(`.store--item-list`);
const CartItemList = document.querySelector(`.cart--item-list`);
const TotalNumber = document.querySelector(`.total-number`);

const UpdateCart = (item, isPlus) => {
  const ItemFoundID = state.cart.indexOf(item);
  if(ItemFoundID != -1)
  {
    if(isPlus)
      state.cart[ItemFoundID].quantity ++;
    else if(state.cart[ItemFoundID].quantity > 0)
      state.cart[ItemFoundID].quantity --;
    else
      state.cart.splice(ItemFoundID, 1);
  }
  else
  {
    if(isPlus)
    {
      state.cart.push(item);
      state.cart[state.cart.length-1].quantity = 1;
    }
  }
  RenderCart();
}

const RenderShop = () => {
  ShopItemList.innerHTML=``;
  state.items.forEach(item => {
    console.log(item);
    const LiElement = document.createElement(`li`);
    const divElement = document.createElement(`div`);
    const ImgElement = document.createElement(`img`);
    const ButtonElement = document.createElement(`button`);
    divElement.setAttribute(`class`, `store--item-icon`);
    ImgElement.src=`assets/icons/${item.id}.svg`;
    ImgElement.alt=item.name;
    ButtonElement.innerHTML = `Add to cart`;
    ButtonElement.addEventListener(`click`, UpdateCart(item, true));
    ShopItemList.append(LiElement);
    LiElement.append(divElement);
    divElement.append(ImgElement, ButtonElement);
  });
}

const RenderCart = () => {
  CartItemList.innerHTML=``;
  state.cart.forEach(item => {
    const LiElement = document.createElement(`li`);
    const ImgElement = document.createElement(`img`);
    const PElement = document.createElement(`p`);
    const MinusButtonElement = document.createElement(`button`);
    const SpanElement = document.createElement(`span`);
    const PlusButtonElement = document.createElement(`button`);
    ImgElement.setAttribute(`class`, `cart--item--icon`);
    ImgElement.src = `assets/icons/${item.id}.svg`;
    ImgElement.alt=item.name;
    PElement.innerText=item.name;
    MinusButtonElement.setAttribute(`class`, `quantity-btn remove-btn center`);
    SpanElement.setAttribute(`class`, `quantity-text center`);
    PlusButtonElement.setAttribute(`class`, `quantity-btn add-btn center`);
    MinusButtonElement.addEventListener(`click`, UpdateCart(item, false));
    MinusButtonElement.addEventListener(`click`, UpdateCart(item, true));
    CartItemList.append(LiElement);
    LiElement.append(ImgElement);
    LiElement.append(PElement);
    LiElement.append(MinusButtonElement);
    LiElement.append(SpanElement);
    LiElement.append(PlusButtonElement);
  })
}

RenderShop();