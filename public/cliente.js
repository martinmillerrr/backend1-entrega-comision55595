const socket = io();

const productList = document.getElementById('productList');
const addProductForm = document.getElementById('addProductForm');
const deleteProductForm = document.getElementById('deleteProductForm');


socket.on('product-list', (products) => {

    productList.innerText = '';
    products.forEach((product) => {
        const p = document.createElement('p');
        p.innerText = `${product.title} : ${product.price}`
        productList.appendChild(p)
    });

})

addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productIdAdd = document.getElementById('productIdAdd').value;

    socket.emit('addProduct', {
        title: productName,
        price: productPrice,
        id: productIdAdd
    });
    productName.value = '';
    productPrice.value = '';
    productIdAdd.value = '';

});

deleteProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const productIdDelete = document.getElementById('productIdDelete').value;
    socket.emit('deleteProduct', productIdDelete);
});



// socket.on('updateProducts', (products) => {
//     productList.innerHTML = '';
//     products.forEach((product) => {
//         const li = document.createElement('li');
//         li.textContent = `${product.name} - ${product.price}`;
//         productList.appendChild(li);
//     });
// });