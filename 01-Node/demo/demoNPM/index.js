const  { minombre, NOMBRE2, NOMBRE3, pruebaPromesa } = require("./consts/nombres.js")
/* const nombre = require("./consts/nombres.js") */

pruebaPromesa.then((res)=>{
    console.log(res);
}).catch((err)=>{console.log(err)});

console.log(minombre, " y ",NOMBRE2, NOMBRE3 );

console.log("Hola!")

console.log("Probando el nodemon con el comando npm run dev")

// const moment = require('moment');

// console.log(moment().format("MMMM d YYYY"))




