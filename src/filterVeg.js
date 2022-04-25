import state from "./state.js";
const vegBtn = document.querySelector(".veg-btn");

const filterVeg = () => {
  const onlyVeg = state.items.filter((item) => item.type === "vegetable");
  return onlyVeg;
};

vegBtn.addEventListener("click", () => {
  filterVeg();
  console.log(filterVeg());
});
