const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;

app.use(bodyParser.json());

// Manejo de productos
const productsRouter = express.Router();
app.use('/api/products', productsRouter);

// Datos de productos (simulación de base de datos)
const products = [];

// Rutas para productos
productsRouter.get('/', (req, res) => {
    // Listar todos los productos
    res.json(products);
});

productsRouter.get('/:pid', (req, res) => {
    // Obtener un producto por ID
    const productId = req.params.pid;
    const product = products.find((p) => p.id === productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

productsRouter.post('/', (req, res) => {
    // Agregar un nuevo producto
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct);
});

productsRouter.put('/:pid', (req, res) => {
    // Actualizar un producto por ID
    const productId = req.params.pid;
    const updatedProduct = req.body;
    const index = products.findIndex((p) => p.id === productId);
    if (index !== -1) {
        products[index] = updatedProduct;
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

productsRouter.delete('/:pid', (req, res) => {
    // Eliminar un producto por ID
    const productId = req.params.pid;
    const index = products.findIndex((p) => p.id === productId);
    if (index !== -1) {
        products.splice(index, 1);
        res.json({ message: 'Producto eliminado' });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// Manejo de carritos
const cartsRouter = express.Router();
app.use('/api/carts', cartsRouter);

// Datos de carritos (simulación de base de datos)
const carts = [];

// Rutas para carritos
cartsRouter.post('/', (req, res) => {
    // Crear un nuevo carrito
    const newCart = req.body;
    carts.push(newCart);
    res.status(201).json(newCart);
});

cartsRouter.get('/:cid', (req, res) => {
    // Listar productos de un carrito por ID
    const cartId = req.params.cid;
    const cart = carts.find((c) => c.id === cartId);
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ message: 'Carrito no encontrado' });
    }
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
    // Agregar un producto a un carrito
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { product, quantity } = req.body;
    const cart = carts.find((c) => c.id === cartId);
    if (cart) {
        cart.products.push({ product, quantity });
        res.json(cart.products);
    } else {
        res.status(404).json({ message: 'Carrito no encontrado' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});


