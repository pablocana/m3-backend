//console.log(process)

/////////////////////////////

const commands = require('./commands/index');

const print = function(output){
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}


// Output un prompt     
process.stdout.write('prompt > ');      
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {         // a traves de on (va a tomar el evento)=> stdin 'data' es el evento que estamos esperando que se dispare, este se dispara cuando el user escribe un linea.

    let args = data.toString().trim().split(" ");
    let cmd = args.shift();

    if(commands[cmd]){
        //hasOwnProperty
        commands[cmd](args, print);
    }else{
        //command not found
        print('cmd not found');
    }

})