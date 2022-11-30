
//console.log(process)

/////////////////////////////

/* process.stdout.write("Inicio -->\n"); // con \n le agrego un salto de linea, sino me muestra todo seguido.

process.stdin.on("data", (data)=>{               //esto me devuelve lo que escribo en la terminal.
    process.stdout.write("Respuesta: " + data);
}); */

////////////////////////////////

const commands = require('./commands/index');

const print = function(output){
    process.stdout.write(output /* + "\n" */);      // puedo agregar el salto de linea aca tmbien.
    process.stdout.write('\nprompt > ');
}

// Output un prompt     
process.stdout.write('prompt > ');      
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {          // a traves de on (va a tomar el evento)=> stdin 'data' es el evento que estamos esperando que se dispare, este se dispara cuando el user escribe un linea.

    let args = data.toString().trim().split(" ");
    let cmd = args.shift();
    // process.stdout.write(cmd + "\n");               // nos devuelve el comando + un salto de linea.
    // process.stdout.write("prompt > ");              // nos devuelve el prompt > para seguir escribiendo.

    if(commands[cmd]){                              // ejemplo de comando: echo (repite lo que le escribamos) (ver lista de comandos en ./commands/index.js)
        //otra opción es: hasOwnProperty
        commands[cmd](args, print);
    }else{
        //command not found
        print('cmd not found');                     // comando no encontrado.
    }
});

////////////////////////////////


//process.stdout.write('Hola probando el print');

// Object.keys(process) 


/* 
// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
    var cmd = data.toString().trim(); // remueve la nueva línea
    process.stdout.write('You typed: ' + cmd);
    process.stdout.write('\nprompt > ');
});
 */