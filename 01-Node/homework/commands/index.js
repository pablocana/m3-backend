let fs = require('fs');
let request = require('request');

module.exports = {
    echo: function(args, print) {
        print(args.join(" "));
    },
    date: function(args, print) {
        print(Date());    
    },
    
    ls: function(args, print){
        fs.readdir('.', function(err, files){           // con un "." marco el directorio donde estoy parado.           
            if(err) throw err;
            print(files.join('\n'));
        })                                           
    },
    pwd: function(args, print){                         //print working directory => donde estamos parados.
        print(process.cwd());
    },
    cat: function(args, print){                         // muestra el contenido de un archivo.
        fs.readFile(args[0], 'utf8', function(err, data){
            if(err) throw err;
            print(data);
        });
    },
    head: function(args, print){
        fs.readFile(args[0], 'utf8', function(err, data){
            if(err) throw err;
            data.split('\n').splice(0, 10).join('\n');   // empeza en 0 y elimina 10 elementos. (slice accede a una parte de un arreglo sin modificarlo).
         });  
    },
    tail: function(args, print){                            // lee las ultimas lineas que le indique.
        fs.readFile(args[0], 'utf8', function(err, data){
            if(err) throw err;
           print(data.split('\n').splice(-args[1]).join('\n'));                 // cuando le pongo negativo como => -args(1) => va de atras para adelante.
        });
    },
    curl: function(args, print){
        request(args[0], function(err, data){
            if(err) throw err;
            print(data.body);     
        });    
    },
}


//otra forma de hacerlo:
/* export function echo(args, print) {
    print(args.join(" "));
}
export function date(args, print) {
    print(Date());
}
export function ls(args, print) {
    fs.readdir('.', function(err, files){                         
        if(err) throw err;
        print(files.join('\n')); 
    // let output= '';                                          // la otra forma es definir una variable y usar un forEach.
    //files.forEach(e => {output = output + e + '\n'})
    // print(output);
    })  
} */