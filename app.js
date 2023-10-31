// Importa las dependencias
const express = require('express');
const ProductManager = require('./productmanager.js');

// Crea una instancia de Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Endpoint para obtener todos los productos
app.get('/products', (req, res) => {
    // Lee los productos desde ProductManager
    const products = ProductManager.getProducts();

    // Verifica si se proporciona un límite (query param: limit)
    const limit = req.query.limit;
    if (limit) {
        const limitedProducts = products.slice(0, parseInt(limit));
        return res.json({ products: limitedProducts });
    }

    // Devuelve todos los productos
    res.json({ products });
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', (req, res) => {
    const productId = req.params.pid;
    const product = ProductManager.getProductById(productId);

    if (product) {
        res.json({ product });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// Inicializa el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
