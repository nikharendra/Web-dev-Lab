// script file 

let display = document.getElementById("display")

function appendValue(value){
    display.value += value;
}

function appendFunction(func){
    display.value += func;
}

function clearDisplay(){
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0,-1);
}

function calculate() {
    
    let expression = display.value;

    expression = expression.replace(/sqrt\(/g,"Math.sqrt(");
    expression = expression.replace(/sin\(/g,"Math.sin(");
    expression = expression.replace(/cos\(/g,"Math.cos(");
    expression = expression.replace(/tan\(/g,"Math.tan(");
    expression = expression.replace(/log\(/g,"Math.log10(");
    expression = expression.replace(/ln\(/g,"Math.log(");

    expression = expression.replace(/pow\(([^,]+),([^)]+)\)/g,"Math.pow($1,$2)");

    try{
        display.value = eval(expression);
    }
    catch{
        display.value="Error";
    }
}