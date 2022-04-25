import state from "./state.js";

const getTotal = () => {
  const totalNumber = document.querySelector(".total-number");
  const priceArr = state.cart.map((item) => {
    return item.price * item.quantity;
  });

  const totalPrice = priceArr.reduce((item1, item2) => {
    return item1 + item2;
  }, 0);

  totalNumber.innerText = `£${Number(
    Number.parseFloat(totalPrice).toFixed(3)
  )}`;
  return totalNumber;
};

export default getTotal;
