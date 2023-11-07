const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const exphbs = require('express-handlebars');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.engine('handlebars', exphbs({ defaultLayout: 'home' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts');
});

// Configura una lista de productos de ejemplo
const products = [
    { id: 1, name: 'Producto 1' },
    { id: 2, name: 'Producto 2' },
    // Agrega más productos aquí
];

io.on('connection', (socket) => {
    // Enviar la lista de productos a la vista en tiempo real
    socket.emit('updateProducts', products);

    socket.on('addProduct', (product) => {
        // Agregar un producto a la lista
        products.push(product);
        // Emitir una actualización a todos los clientes
        io.emit('updateProducts', products);
    });

    socket.on('deleteProduct', (productId) => {
        // Eliminar un producto de la lista
        const index = products.findIndex((product) => product.id === productId);
        if (index !== -1) {
            products.splice(index, 1);
            // Emitir una actualización a todos los clientes
            io.emit('updateProducts', products);
        }
    });
});

server.listen(3010, () => {
    console.log('Servidor en ejecución en http://localhost:3010');
});
