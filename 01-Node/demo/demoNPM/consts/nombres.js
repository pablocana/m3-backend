const NOMBRE1 = "Pablo";
const NOMBRE2 = "otro nombre";
const NOMBRE3 = "Nuevo nombre";

const pruebaPromesa = new Promise((a, b)=>{  // a: resolve, b: reject.
    setTimeout(()=>{
        const suma = 2 + 3;
        if(suma>6){
            a(suma);
        } else {
            b(console.log("rechazada, valor menor a 6"))
        }
    }, 2000);
});




module.exports = {minombre:NOMBRE1, NOMBRE2, NOMBRE3, pruebaPromesa};
