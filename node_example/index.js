var rect = require('./rectangle.js');

function solveRect(a,b){
    console.log('Solving rectangle with a= ' + a + " and b=" + b);
    if (a<=0 || b<=0){
        console.log ('The value of "a" or "b" must be greater than 0')
    }
    else{
        console.log("The perimeter of the rectangle is " + rect.perimeter(a,b))
        console.log("The area of the rectangle is " + rect.area(a,b));
    }
}

solveRect(3,5);

