const { server } = require('./server.js');

server.listen(3000);

// si queremos saber si la app esta realmente levantada lo que podemos hacer es pasarle un cb asi:
// server.listen(3000, ()=>console.log('listening on port 3000'));
