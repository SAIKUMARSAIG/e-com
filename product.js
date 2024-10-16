const products = [
    {
        id: 1,
        name: "Classic Red T-Shirt",
        price: 19.99,
        image: "./images/product-1.jpg",
        description: "A comfortable, 100% cotton red t-shirt perfect for everyday wear."
    },
    {
        id: 2,
        name: "Men's Running Shoes",
        price: 79.99,
        image: "./images/product-2.jpg",
        description: "Lightweight and breathable running shoes with superior cushioning."
    },
    {
        id: 3,
        name: "Wireless Bluetooth Earbuds",
        price: 49.99,
        image: "./images/product-3.jpg",
        description: "True wireless earbuds with excellent sound quality and long battery life."
    },
    {
        id: 4,
        name: "Leather Wallet",
        price: 29.99,
        image: "./images/product-4.jpg",
        description: "Genuine leather wallet with multiple card slots and a coin pocket."
    },
    {
        id: 5,
        name: "Stainless Steel Water Bottle",
        price: 24.99,
        image: "./images/product-5.jpg",
        description: "Durable, insulated water bottle that keeps drinks cold for up to 24 hours."
    },
    {
        id: 6,
        name: "Yoga Mat",
        price: 34.99,
        image: "./images/product-6.jpg",
        description: "Non-slip, eco-friendly yoga mat perfect for all types of yoga practices."
    },
    {
        id: 7,
        name: "Smart Fitness Tracker",
        price: 89.99,
        image: "./images/product-7.jpg",
        description: "Track your steps, heart rate, and sleep patterns with this sleek fitness band."
    },
    {
        id: 8,
        name: "Portable Bluetooth Speaker",
        price: 59.99,
        image: "./images/product-8.jpg",
        description: "Waterproof, portable speaker with rich sound and 12-hour playtime."
    },
    {
        id: 9,
        name: "Men's Denim Jeans",
        price: 49.99,
        image: "./images/product-9.jpg",
        description: "Classic fit denim jeans, perfect for casual everyday wear."
    },
    {
        id: 10,
        name: "Women's Sunglasses",
        price: 39.99,
        image: "./images/product-10.jpg",
        description: "Stylish sunglasses with UV protection and polarized lenses."
    },
    {
        id: 11,
        name: "Backpack",
        price: 44.99,
        image: "./images/product-11.jpg",
        description: "Durable backpack with multiple compartments, perfect for work or travel."
    },
    {
        id: 12,
        name: "Women's Watch",
        price: 69.99,
        image: "./images/product-12.jpg",
        description: "Elegant stainless steel watch with a minimalist design."
    },
    {
        id: 13,
        name: "Men's Casual Shoes",
        price: 59.99,
        image: "./images/gallery-1.jpg",
        description: "Comfortable, breathable shoes for casual wear."
    },
    {
        id: 14,
        name: "Men's Casual Shoes",
        price: 59.99,
        image: "./images/gallery-1.jpg",
        description: "Comfortable, breathable shoes for casual wear."
    }
];

function displayProducts(productsToDisplay) {
    const root = document.getElementById("root");
    root.innerHTML = productsToDisplay.map((item) => {
        const { id, image, name, price, description } = item;
        return (`
            <div class="box">
                <div class="img-box">
                    <img class="images" src="${image}" alt="${name}" />
                </div>
                <div class="bottom">
                    <p>${name}</p>
                    <h2>$${price.toFixed(2)}</h2>
                    <p>${description}</p>
                    <button onclick="addToCart('${id}', '${name}', ${price}, '${image}'); incrementCartValue()">ADD to Cart</button>
                </div>
            </div>
        `);
    }).join('');
}

function sortByPrice(order = 'asc') {
    const sortedProducts = [...products].sort((a, b) => {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
    displayProducts(sortedProducts);
}

displayProducts(products);

document.addEventListener('DOMContentLoaded', function() {
    const containerSort = document.querySelector('.sort');
    if (containerSort) {
        containerSort.addEventListener('click', function(event) {
            if (event.target.textContent.includes('Low To High')) {
                sortByPrice('asc');
            } else if (event.target.textContent.includes('High To Low')) {
                sortByPrice('desc');
            }
        });
    }
});


function incrementCartValue(){
    let value = document.getElementById("cart-values");
    value.innerHTML = Number(value.innerHTML) + 1;
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartButton();
}

function updateCartButton() {
    const cartBtn = document.getElementById('cart-btn');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBtn.textContent = `Cart (${totalItems})`;
}

function displayProducts(productsToDisplay) {
    const root = document.getElementById("root");
    root.innerHTML = productsToDisplay.map(item => `
        <div class="box">
            <div class="img-box">
                <img class="images" src="${item.image}" alt="${item.name}" />
            </div>
            <div class="bottom">
                <p>${item.name}</p>
                <h2>$${item.price.toFixed(2)}</h2>
                <p>${item.description}</p>
                <button onclick="addToCart(${item.id})">ADD to Cart</button>
            </div>
        </div>
    `).join('');
}

function sortByPrice(order = 'asc') {
    const sortedProducts = [...products].sort((a, b) => 
        order === 'asc' ? a.price - b.price : b.price - a.price
    );
    displayProducts(sortedProducts);
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    updateCartButton();

    document.getElementById('sort-low-to-high').addEventListener('click', () => sortByPrice('asc'));
    document.getElementById('sort-high-to-low').addEventListener('click', () => sortByPrice('desc'));
});