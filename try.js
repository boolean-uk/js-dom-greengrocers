
// const list = [{name: "Yemaneab", age:27}, {name: "David", age:25}, {name: "Abel", age:20}
// ];

// console.log(list);
// const obj = {};
// list.forEach(element => {
//     if(element.name === "Yemaneab"){
//         obj.name = element.name;
//         obj.age = element.age + 1;
//         list.forEach(x => {
//             if(x.name === "Yemaneab"){
//                 const index = list.indexOf(x);
//                 list[index] = obj;
//             }
//         });
//     }
// });

// console.log(list);


list.forEach(element => {
    if(element.name === item.name){
      const index = list.indexOf(element);
      obj.name = element.name;
      obj.amount = element.amount + 1;
      console.log(obj.name);
      console.log(obj.amount);
      list[index] = obj;
    }
    

  });