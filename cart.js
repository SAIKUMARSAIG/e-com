
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCart() {
    const cartElement = document.getElementById('cart');
    let cartHTML = '<h2>Shopping Cart</h2>';
    let total = 0;

    if (cart.length === 0) {
        cartHTML += '<p>Your cart is empty</p>';
    } else {
        cartHTML += '<ul>';
        cart.forEach((item, index) => {
            cartHTML += `
                <li>
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
                    ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                    <button onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                    <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                    <button onclick="removeItem(${index})">Remove</button>
                </li>
            `;
            total += item.price * item.quantity;
        });
        cartHTML += '</ul>';
    }

    cartHTML += `<p>Total: $${total.toFixed(2)}</p>`;
    cartElement.innerHTML = cartHTML;
}

function updateQuantity(index, newQuantity) {
    if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartButton();
}

function updateCartButton() {
    const cartBtn = document.getElementById('cart-btn');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBtn.textContent = `Cart (${totalItems})`;
}

document.addEventListener('DOMContentLoaded', function() {
    displayCart();
    updateCartButton();
});