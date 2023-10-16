const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      visible: true,
      price: 0.35,
      filter: {
        type: "vegetable",
        color: ["pink", "green"],
      },
    },
    {
      id: "002-carrot",
      name: "carrot",
      visible: true,
      price: 0.35,
      filter: {
        type: "vegetable",
        color: ["orange", "green"],
      },
    },
    {
      id: "003-apple",
      name: "apple",
      visible: true,
      price: 0.35,
      filter: {
        type: "fruit",
        color: ["red", "green"],
      },
    },
    {
      id: "004-apricot",
      name: "apricot",
      visible: true,
      price: 0.35,
      filter: {
        type: "fruit",
        color: ["orange", "green"],
      },
    },
    {
      id: "005-avocado",
      name: "avocado",
      visible: true,
      price: 0.35,
      filter: {
        type: "fruit",
        color: ["green"],
      },
    },
    {
      id: "006-bananas",
      name: "bananas",
      visible: true,
      price: 0.35,
      filter: {
        type: "fruit",
        color: ["yellow"],
      },
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      visible: true,
      price: 0.35,
      filter: {
        type: "fruit",
        color: ["green"],
      },
    },
    {
      id: "008-cherry",
      name: "cherry",
      visible: true,
      price: 0.35,
      filter: {
        type: "fruit",
        color: ["red", "green"],
      },
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      visible: true,
      price: 0.35,
      filter: {
        type: "fruit",
        color: ["blue", "green"],
      },
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      visible: true,
      price: 0.35,
      filter: {
        type: "fruit",
        color: ["purple", "green"],
      },
    },
  ],
  cart: [],
};

const STORE = document.querySelector("#store");
const STORE_FILTER = document.querySelector(".store--filter")
const STORE_ITEM_LIST = STORE.querySelector(".store--item-list");

const CART = document.querySelector("#cart");
const CART_ITEM_LIST = CART.querySelector(".cart--item-list");

const TOTAL_SECTION = document.querySelector(".total-section");
const TOTAL_NUMBER = document.querySelector(".total-number");
