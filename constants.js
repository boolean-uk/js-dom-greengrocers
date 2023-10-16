const STATE = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      visible: true,
      price: 1,
      filter: {
        type: "vegetable",
        subType: "root",
        color: ["pink", "green"],
        eddApproved: "no",
        isAPlant: "yes",
      },
    },
    {
      id: "002-carrot",
      name: "carrot",
      visible: true,
      price: 0.25,
      filter: {
        type: "vegetable",
        subType: "root",
        color: ["orange", "green"],
        eddApproved: "yes",
        isAPlant: "yes",
      },
    },
    {
      id: "003-apple",
      name: "apple",
      visible: true,
      price: 0.6,
      filter: {
        type: "fruit",
        subType: "pome",
        color: ["red", "green"],
        eddApproved: "yes",
        isAPlant: "yes",
      },
    },
    {
      id: "004-apricot",
      name: "apricot",
      visible: true,
      price: 0.7,
      filter: {
        type: "fruit",
        subType: "berry",
        color: ["orange", "green"],
        eddApproved: "no",
        isAPlant: "yes",
      },
    },
    {
      id: "005-avocado",
      name: "avocado",
      visible: true,
      price: 2.5,
      filter: {
        type: "fruit",
        subType: "berry",
        color: ["green"],
        eddApproved: "yes",
        isAPlant: "yes",
      },
    },
    {
      id: "006-bananas",
      name: "bananas",
      visible: true,
      price: 10,
      filter: {
        type: "fruit",
        color: ["yellow"],
        subType: "berry",
        eddApproved: "yes",
        isAPlant: "yes",
      },
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      visible: true,
      price: 0.5,
      filter: {
        type: "fruit",
        subType: "berry",
        color: ["green"],
        eddApproved: "yes",
        isAPlant: "yes",
      },
    },
    {
      id: "008-cherry",
      name: "cherry",
      visible: true,
      price: 0.15,
      filter: {
        type: "fruit",
        subType: "berry",
        color: ["red", "green"],
        eddApproved: "yes",
        isAPlant: "yes",
      },
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      visible: true,
      price: 0.25,
      filter: {
        type: "fruit",
        subType: "berry",
        color: ["blue", "green"],
        eddApproved: "yes",
        isAPlant: "yes",
      },
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      visible: true,
      price: 1.35,
      filter: {
        type: "fruit",
        subType: "berry",
        color: ["purple", "green"],
        eddApproved: "no",
        isAPlant: "yes",
      },
    },
  ],
  cart: [],
};

const STORE = document.querySelector("#store");
const STORE_FILTER_SORT = document.querySelector(".store--filter-sort");
const STORE_ITEM_LIST = STORE.querySelector(".store--item-list");

const CART = document.querySelector("#cart");
const CART_ITEM_LIST = CART.querySelector(".cart--item-list");

const TOTAL_SECTION = document.querySelector(".total-section");
const TOTAL_NUMBER = document.querySelector(".total-number");
