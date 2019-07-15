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
    $("#decimal").on("click", decimalButtonHandler);
   
}


function numberButtonHandler(event){
    //console.log(event);

    var inputtedNumber = "";
    inputtedNumber = $(event.currentTarget).find("p").text();
    //console.log("inputnumber", inputtedNumber);
    stringNumberToPush += inputtedNumber;
    console.log("string", stringNumberToPush);
    displayArray.push(inputtedNumber);
    //console.log("display",displayArray);

    updateDisplay();

}

function operatorButtonHandler(event){
    //console.log(event);
    var inputtedOperator = "";
    inputtedOperator = $(event.currentTarget).find("p").text();
    displayArray.push(inputtedOperator);
    updateDisplay();

    //Push number to calculation array
    if (stringNumberToPush !== ""){
        calculationArray.push(stringNumberToPush);
    } 
   
    //Push Operator to calculation array
    var operatorSign = calculationArray[calculationArray.length-1];
    if(calculationArray.length > 0){
        if(operatorSign === "+" || operatorSign === "-" || operatorSign === "*" || operatorSign === "/"){
            if(inputtedOperator === "*"){
                calculationArray[calculationArray.length-1] = "*";      
            }
            else if (inputtedOperator === "/" && operatorSign !== "*"){
                calculationArray[calculationArray.length-1] = "/";    
            }
            else if (inputtedOperator === "+" && (operatorSign !== "*" || operatorSign !== "/")){
                calculationArray[calculationArray.length-1] = "+";
            }
            else if(inputtedOperator === "-" && (operatorSign !== "*" || operatorSign !== "/" || operatorSign !== "+")){
                calculationArray[calculationArray.length-1] = "-";       
            }
        }
        else {

            calculationArray.push(inputtedOperator);
        }   
    } 
    stringNumberToPush = "";

    

}

function equalsButtonHandler(event){
    //console.log(event);
    if(stringNumberToPush !== ""){
        calculationArray.push(stringNumberToPush);
        //console.log(calculationArray);
    }
    //else {
        //console.log('next steps');
        stringNumberToPush = "";
        displayArray = [];
        var calvalue = null;
        var answer = null;
        console.log('calculation array ' , calculationArray);
        answer  = parseFloat(calculationArray[0]);

        if(calculationArray.length === 2 && calculationArray[calculationArray.length-1] === "*"){
            calvalue = calculationArray[0] ** 2;
        }
        else if(calculationArray.length === 1){
            calvalue = calculationArray[0];
        }
        else if(calculationArray.length === 0){
            calvalue = 0;
        }

        else{
            console.log("calc",calculationArray);   
            for (var i = 0; i < calculationArray.length-1; i+=2){
            calvalue =  calculate(answer, calculationArray[i+2], calculationArray[i+1]);
            answer = calvalue;
            } 
        }  


    displayArray.push(calvalue);
    updateDisplay();
}

function updateDisplay(){
    var displayText = displayArray.join("");
    $("#display-text").text(displayText);

}

function calculate(num1, num2, operator){
    var result = null;
    var number1 = parseFloat(num1);
    var number2 = parseFloat(num2);

    switch(operator){
        case "+":
            result = number1 + number2;
            break;
        case "-":
            result = number1 - number2;
            break;
        case "*":
            result = number1 * number2;
            break;
        case "/":
            if (number2 === 0){
                result = "Error";
            }
            else {
                result = number1 / number2;
            }
    }
    return (result);
}

function decimalButtonHandler(){
    var decimal = $(event.currentTarget).find("p").text();
    displayArray.push(decimal);
    updateDisplay();

    var a = stringNumberToPush.length-1;
    console.log("a",a);
    if(stringNumberToPush[a] !== '.'){
        stringNumberToPush += decimal;  
    }
    




}











