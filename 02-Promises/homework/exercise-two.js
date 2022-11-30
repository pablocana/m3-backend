'use strict';

var Promise = require('bluebird'),
    async = require('async'),
    exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile,
    promisifiedReadFile = exerciseUtils.promisifiedReadFile,
    blue = exerciseUtils.blue,
    magenta = exerciseUtils.magenta;

var args = process.argv.slice(2).map(function(st){ return st.toUpperCase(); });

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function(arg){
  var problem = module.exports['problem' + arg];
  if (problem) problem();
});

function problemA () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. loggea el poema dos stanza uno y stanza dos en CUALQUIER orden
   *    pero loggea 'done' cuando ambos hayan terminado
   *    (ignora errores)
   *    nota: lecturas ocurriendo paralelamente (en simultaneo)
   *
   */

  // callback version

  /* async.each(['poem-two/stanza-01.txt', 'poem-two/stanza-02.txt'],
    function (filename, eachDone) {
      readFile(filename, function (err, stanza) {
        console.log('-- A. callback version --');
        blue(stanza);
        eachDone();
      });
    },
    function (err) {
      console.log('-- A. callback version done --');
    }
  ); */

  // promise version
  // ???

    let p1 = promisifiedReadFile('poem-two/stanza-01.txt')
      .then(stanza1 => blue(stanza1));
      //p1 es una promesa porque .then devuelve una promesa.

    let p2 = promisifiedReadFile('poem-two/stanza-02.txt')
      .then(stanza2 => blue(stanza2));

// Al hacerlo asi, ambos terminan su .then antes de empezar el .then del promise.all.
// De esta forma ambos inician la ejecucion del .then del promise.all al mismo tiempo y aleatoriamente terminara uno antes que el otro.

    Promise.all([p1, p2]).then(()=> console.log('done'));

  //usamos el Promise.all() => este recibe un arreglo con las promesas que busca resolverlas todas al mismo instante, sin importar cual termina antes,
  // cuando todas hayan terminado, recien ahi ejecuta el .then 
  // si yo quisiese, va a alojar el valor de resolucion en un nuevo arreglo.
  // En realidad lo que estoy haciendo es generando una nueva promesa.

}

function problemB () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. loggea todas las stanzas en poema dos, en cualquier orden y loggea
   *    'done' cuando todas hayan terminado
   *    (ignora errores)
   *    nota: las lecturas ocurren en paralelo (en simultaneo)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });

// me estan diciendo que quieren que se ejecute en cualquier orden, pero que las lecturas ocurran en paralelo.

  // callback version

  /* async.each(filenames,
    function (filename, eachDone) {
      readFile(filename, function (err, stanza) {
        console.log('-- B. callback version --');
        blue(stanza);
        eachDone();
      });
    },
    function (err) {
      console.log('-- B. callback version done --');
    }
  ); */

  // promise version
  // ???

  let promiseArray = filenames.map(file => promisifiedReadFile(file).then(stanza => blue(stanza)));
// lo que estoy haciendo en definitiva es que promiseArray es un arreglo de promesas.
  Promise.all(promiseArray).then(()=> console.log('done'));
// aca volvimos a aplicar lo mismo que el anterior basicamente.

}

function problemC () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. Lee y loggea todas las stanzas en el poema dos, *en orden* y
   *    loggea 'done cuando hayan terminado todas
   *    (ignorá errores)
   *    nota: las lecturas ocurren EN SERIE (solo cuando las previas                // al decirnos "EN SERIE" nos esta diciendo no leerlo con .all 
   *    hayan terminado)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });

  // callback version

  /* async.eachSeries(filenames,
    function (filename, eachDone) {
      readFile(filename, function (err, stanza) {
        console.log('-- C. callback version --');
        blue(stanza);
        eachDone();
      });
    },
    function (err) {
      console.log('-- C. callback version done --');
    }
  ); */

  // promise version
  // ???

  // ALTERNATIVA 1: (con for)

  for(let i = 1, p = promisifiedReadFile(filenames[0]); i <= filenames.length; i++) {    
// el 1er promisifiedReadFile que tengo que hacer es stanza1 entonces inicio en filenames[0].
// estoy buscando que "p" sea la concatenacion de todo.
    p = p.then((stanza) => {
      blue(stanza);
      if(i === filenames.length){
        console.log('done');
      }else{
        return promisifiedReadFile(filenames[i]);                  // hasta que este no este resuelto no pasa al siguiente .then()
      };
    });
  };  

  // ALTERNATIVA 2: (con reduce())                                  // (para explicarlo es mas confuso con reduce que con for).

  /* filenames.reduce((promesaAnterior, filename) =>{
    return promesaAnterior.then(stanza =>{
      if(stanza) blue(stanza);
      return promisifiedReadFile(filename);
    })
  }, ) */
  //aca le falta todavia el cb. 

// ALTERNATIVA 3: // tambien se puede hacer con un Promise.each (VER BIEN COMO SE HACE) 
}

function problemD () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. loggea todas las stanzas en el poema dos *en orden* asegurandote
   *    de fallar para cualquier error y logueando un 'done cuando todas
   *    hayan terminado
   *    nota: las lecturas ocurren EN SERIE (solo cuando las previas                // al decirnos "EN SERIE" nos esta diciendo no leerlo con .all 
   *    hayan terminado)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });
  var randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = 'wrong-file-name-' + (randIdx + 1) + '.txt';

  // callback version

  /* async.eachSeries(filenames,
    function (filename, eachDone) {
      readFile(filename, function (err, stanza) {
        console.log('-- D. callback version --');
        if (err) return eachDone(err);
        blue(stanza);
        eachDone();
      });
    },
    function (err) {
      if (err) magenta(new Error(err));
      console.log('-- D. callback version done --');
    }
  ); */

  // promise version
  // ???

  for(let i = 1, p = promisifiedReadFile(filenames[0]); i <= filenames.length; i++) {    
    p = p.then((stanza) => {
      blue(stanza);
      if(i === filenames.length){
        console.log('done');
      }else{
        return promisifiedReadFile(filenames[i]);                 
      };
    });
    
    if(i === filenames.length) {
      p.catch(err => {magenta(new Error(err)); console.log('done');});
    };
  };
};

function problemE () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. Haz una versión promisificada de fs.writeFile
   *
   */

  var fs = require('fs');
  function promisifiedWriteFile (filename, str) {
    // tu código aquí
    return new Promise((resolve, reject) => {
      fs.writeFile(filename, str, (err)=> {
        if(err) reject(err);
        else resolve('ESCRITURA EXITOSA, SOS LO +');
      })
    })
  }
// aca lo que hacemos basicamente es que la lectura que ya existe y es de caracteristicas asincronas, (sabiendo que las promesas vienen a resolver acciones asinc),
// le decimos, anda y escribi, le pasamos el archivo sobre el cual tiene que escribir, le pasamos el string que tiene q escribir y esto recibe un cb de error.
// si tenes un error, rechazate, sino resolvete.
// Entonces, lo que era la lectura asincrona, ahora la logramos hacer una promesa => ahora vamos a poder trabajarla con .then() que antes no podiamos hacerlo.
//Es decir, tomamos el callback y lo transformamos en una promesa.   
}
