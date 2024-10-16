import products from './products.js';
import cart from './cart.js';

const app = document.getElementById('app');
const temporaryContent = document.getElementById('temporaryContent');

// Load layout file
const loadTemplate = () => {
    fetch('/template.html')
        .then(response => response.text())
        .then(html => {
            app.innerHTML = html;
            const contentTab = document.getElementById('contentTab');
            contentTab.innerHTML = temporaryContent.innerHTML;
            temporaryContent.innerHTML = '';
            cart();
            initApp();
        })
        .catch(error => console.error('Error loading template:', error));
};

const initApp = () => {
    // Load list of products
    const listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    products.forEach(product => {
        const newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.innerHTML = `
            <a href="/detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
            </a>
            <h2>${product.name}</h2>
            <div class="price">$${product.price.toFixed(2)}</div>
            <button class="addCart" data-id='${product.id}'>
                Add To Cart
            </button>`;
        listProductHTML.appendChild(newProduct);
    });
};

// Event listener for adding products to cart
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('addCart')) {
        const productId = event.target.getAttribute('data-id');
        // Implement your add to cart logic here
        console.log(`Product ${productId} added to cart`);
    }
});
loadTemplate();