// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests: (con esto si le llega un json lo transforma)
server.use(express.json());

// server.METHODS(URL, (req, res, next) =>{})

//como se va a repetir varias veces el path nos creamos una constante y la invocamos directamente llamandola:
const PATH = '/posts'
// como dijimos que vamos a tener un id, lo agregamos aca por ahora, ya que estamos trabajando de forma estatica:
let id = 1;

// TODO: your code to handle requests

// prueba con postman de request POST:
/* server.post(PATH, (req, res)=> {
    const {author, title, contents}= req.body;
    // let author = req.body.author;                        // otra forma de hacerlo es esta.
    console.log(author, title, contents);
    res.send('done');
}); */

server.post(`${PATH}/author/:author`, (req, res)=>{
    let {author} = req.params;
    let {title, contents} = req.body;

    if(!author || !title || !contents){
        return res
        .status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para crear el Post"})
     }
 
     const post = {
         author, title, contents, id: id++
     };
 
     posts.push(post);
     res.status(200).json(post);
 
})

//lo modificamos con el de arriba.
/* server.post(PATH, (req, res)=> {
    const {author, title, contents}= req.body;
    // let author = req.body.author;                        
    console.log(author, title, contents);
    
}); */


server.get(PATH, (req, res)=> {
    let {term} = req.query;
    if(term){
        const term_post = posts.filter(
            p => p.title.includes(term) || p.contents.includes(term)
        );
        return res.json(term_post);
    };
    res.json(posts);
});


server.get(`${PATH}/:author`, (req, res)=> {
    let {author} = req.params;
    // filter que devuelva un nuevo arreglo con la coincidencia de author: 
    const posts_author = posts.filter(p => p.author === author);
    if(posts_author.length > 0) {
        res.json(posts_author);
    }else{
        return res
        .status(STATUS_USER_ERROR)
        .json({error: "No existe ningun post del autor indicado"})
    }
});


server.get(`${PATH}/:author/:title`, (req, res)=> {
    let {author, title} = req.params;
    
    const new_posts =  posts.filter(p => p.author === author && p.title === title);
    if(new_posts.length > 0) {
        res.json(new_posts);
        }else{
            res
            .status(STATUS_USER_ERROR)
            .json({error: "No existe ningun post con dicho titulo y autor indicado"})
        }
});

// aca hacemos un chequeo extra, aunque con params no haria falta. // en query si nos podria faltar algun valor.

server.get(`${PATH}/:author/:title`, (req, res)=> {
    let {author, title} = req.params;
    
    if(author && title){
    const new_posts =  posts.filter(p => p.author === author && p.title === title);
        if(new_posts.length > 0) {
            res.json(new_posts);
            }else{
            res
            .status(STATUS_USER_ERROR)
            .json({error: "No existe ningun post con dicho titulo y autor indicado"})
        }
    }else{
        res
        .status(STATUS_USER_ERROR)
        .json({error: "No existe ningun post con dicho titulo y autor indicado"})
    }     
});



// aca vamos a modificar el arreglo:
server.put(PATH, (req, res)=>{
    let {id, title, contents} = req.body;
    if(id && title && contents){
// aca vamos a usar un .find() que nos devuelve el primer elemento que coincida 
// como el id es unico deberia encontrar un unico elemento pasado por body:
// ACLARACION: siempre que lo mande por query o params me va a llegar como un STRING !!!
// en esos casos debemos comparar, aplicamos un "==" o parseamos alguno de los 2 valores a un int
        let post = posts.find(p => p.id === parseInt(id));    // si el id es un numero lo dejara como nro sino lo transformara y listo.
        // en post me guarde la referencia al obj posts.
        if(post){
            posts.title = title;
            post.contents = contents;
            res.json(post);
        }else{
            res
            .status(STATUS_USER_ERROR)
            .json({error: "No existe un post con dicho ID"})                            // ERROR CON ID
        }
    }else{
        res
        .status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }

});




module.exports = { posts, server };
