var rect = require('./rectangle.js');

function solveRect(a,b){
    console.log('Solving rectangle with a= ' + a + " and b=" + b);

    rect(a,b,(err,rectangle)=>{
        if(err){
            console.log('Error', err.message);
        }
        else{
            console.log('Area of the rectangle is.......... '+ rectangle.area());
            console.log('Perimeter of the rectangle is..... '+ rectangle.perimeter());
        }
    });
    console.log("It takes 2 seconds for 'rect()' to process ");
}

solveRect(3,5);
solveRect(0,-2);

