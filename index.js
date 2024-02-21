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

const createStore = (poke) => {

  let itemName = poke.name
  itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1)
  
  return `<li class="card">
      <h2 class="card--title">${pokeName}</h2>
      <img
        width="256"
        class="card--img"
        src=${poke.sprites.other["official-artwork"].front_default}
      />
      <ul class="card--text">
        <li>HP: ${poke.stats[0].base_stat}</li>
        <li>ATTACK: ${poke.stats[1].base_stat}</li>
        <li>DEFENSE: ${poke.stats[2].base_stat}</li>
        <li>SPECIAL-ATTACK: ${poke.stats[3].base_stat}</li>
        <li>SPECIAL-DEFENSE: ${poke.stats[4].base_stat}</li>
        <li>SPEED: ${poke.stats[5].base_stat}</li>
      </ul>
    </li>`
    
  }
  
  const createAllPokes = (pokelist) => {
      return pokelist.map(p => createPoke(p))
  }
  
  document.getElementsByClassName('cards')[0].innerHTML = createAllPokes(data).join('')
  