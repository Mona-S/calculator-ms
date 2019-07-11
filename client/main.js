$(document).ready(initializeApp);

var calculationArray = [];
var displayArray = [];
var stringNumberToPush = "";
var calculationResult = null;

function initializeApp(){
    applyClickHandlers();
}

function applyClickHandlers(){
    $("#number-block").on("click", ".number", numberButtonHandler);
    $("#operator-column").on("click", ".operator", operatorButtonHandler);
    $("#equals").on("click", equalsButtonHandler);
   
}


function numberButtonHandler(event){
    //console.log(event);
    var inputtedNumber = "";
    inputtedNumber = $(event.currentTarget).find("p").text();
    stringNumberToPush += inputtedNumber;
    //console.log(stringNumberToPush);
    
    displayArray.push(inputtedNumber);
    console.log(displayArray);
    updateDisplay();

}

function operatorButtonHandler(event){
    //console.log(event);
    var inputtedOperator = "";
    inputtedOperator = $(event.currentTarget).find("p").text();
    displayArray.push(inputtedOperator);
    updateDisplay();
    calculationArray.push(stringNumberToPush);
    calculationArray.push(inputtedOperator);
    console.log(calculationArray);
    stringNumberToPush = "";

}

function equalsButtonHandler(event){
    console.log(event);
    console.log(stringNumberToPush);
    calculationArray.push(stringNumberToPush);
    console.log(calculationArray);
    stringNumberToPush = "";
    displayArray = [];


}

function updateDisplay(){
    var displayText = displayArray.join("");
  
   // console.log(displayText);
    //console.log(displayArray);
    $("#display-text").text(displayText);

}