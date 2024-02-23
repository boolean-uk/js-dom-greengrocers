import { state } from './javascripts/state.js'
import { populateItems } from './javascripts/populate.js'
import { updateCart } from './javascripts/updateCart.js'

document.addEventListener(`DOMContentLoaded`, function () {
  document.getElementById('filter-type').addEventListener('change',
    () => populateItems('.item-list.store--item-list', state));
  document.getElementById('sort-options').addEventListener('change',
    () => populateItems('.item-list.store--item-list', state));
  document.addEventListener('cartUpdated', () => updateCart(state))
  populateItems('.item-list.store--item-list', state)
});



