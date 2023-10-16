//Create array of options to be added
var array = ["Mercedes 1","Mercedes 2","Mercedes 3","Mercedes 4"];

//Create and append select list
var selectList = document.createElement("select");
selectList.id = "mySelect";
var target = document.getElementById('new');


//Create and append the options
for (var i = 0; i < array.length; i++) {
    var option = document.createElement("option");
    option.value = array[i];
    option.text = array[i];
    selectList.appendChild(option);
}

var selection = document.getElementsByTagName('select')[0];
selection.onclick = function() {
  if (selection.value == 'mercedes') {
    target.appendChild(selectList);
  }
}