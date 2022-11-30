'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise (executor){                                                         // este es mi constructor.
    if(typeof executor !== 'function') throw new TypeError('executor function');

    this._state = 'pending';
//this._value = undefined;                                          // tambien puedo agregarlo aca.
    this._handlerGroups = [];                           // aca lo que hacemos es una cola de pendientes, es decir, como p todavia no tienen valor almacena aca todo hasta que se resuelva.
    executor(this._internalResolve.bind(this),this._internalReject.bind(this));     // hacemos el binding (xq el contexto de ejecucion se genera al momento de ejecutarlo). 
    // executor(()=> internal..., ()=> internal...);                                    // o invocarlo con arrow function.
    
};

$Promise.prototype._internalResolve = function(value){
    if(this._state === 'pending'){
        this._state = 'fulfilled';
        this._value = value;                                // lo coloco dentro del if porque solo se puede cambiar una vez.
        this._callHandlers();
    }
};

$Promise.prototype._internalReject = function(value){
    if(this._state === 'pending'){
        this._state = 'rejected';
        this._value = value;
        this._callHandlers();
    }
};

$Promise.prototype.then = function(successCb, errorCb){
    if(typeof successCb !== 'function') successCb = false;
    if(typeof errorCb !== 'function') errorCb = false;     
    const downstreamPromise = new $Promise(()=>{});                     
    this._handlerGroups.push({successCb, errorCb, downstreamPromise});          // aca lo que hicimos es destructuring, como el nombre de la prop es igual a su value, para no ser redundante ponemos asi y se asigna como nombre (key) el mismo nombre con el valor correspondiente. 
    if(this._state !== 'pending') this._callHandlers();
    return downstreamPromise; 
};

$Promise.prototype._callHandlers = function(){
    while(this._handlerGroups.length > 0){
        let current =  this._handlerGroups.shift();
        if(this._state === 'fulfilled'){
            if(!current.successCb){                                                     // no tenes SH.
                current.downstreamPromise._internalResolve(this._value);                // resolve al valor.
            }else{                                                                      // tenes SH:
                try{
                    const result = current.successCb(this._value);
                    if(result instanceof $Promise){
                        result.then((value) => current.downstreamPromise._internalResolve(value),
                        (err) => current.downstreamPromise._internalReject(err));
                    }else{
                        current.downstreamPromise._internalResolve(result);    
                    }
                }catch(e){
                    current.downstreamPromise._internalReject(e);
                }               
            }
            // current.successCb && current.successCb(this._value);
        } else if(this._state === 'rejected'){
            // current.errorCb && current.errorCb(this._value);
            if(!current.errorCb){
                current.downstreamPromise._internalReject(this._value);
            }else{
                try{
                    const result = current.errorCb(this._value);
                    if(result instanceof $Promise){
                        result.then(value => current.downstreamPromise._internalResolve(value),
                        err => current.downstreamPromise._internalReject(err));
                    }else{
                        current.downstreamPromise._internalResolve(result);
                    }
                }catch(e){
                    current.downstreamPromise._internalReject(e);
                }
            }
        }
    }
};

$Promise.prototype.catch = function(errorCb){
    return this.then(null, errorCb);
};




module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
