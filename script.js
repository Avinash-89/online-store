let cart = [];
const cartButton = document.getElementById('cartButton');
const cartModal = document.getElementById('cartModal');
const closeCartButton = document.getElementById('closeCartButton');
const checkoutButton = document.getElementById('checkoutButton');
const cartCount = document.getElementById('cartCount');
const cartItemsList = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const productCards = document.querySelectorAll('.product-card');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const productName = this.getAttribute('data-name');
        const productPrice = parseFloat(this.getAttribute('data-price'));
        addToCart(productName, productPrice);
    });
});

cartButton.addEventListener('click', () => {
    showCart();
});

closeCartButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

checkoutButton.addEventListener('click', () => {
    alert('Proceeding to checkout...');
    cartModal.style.display = 'none';
    cart = [];
    updateCart();
});

function addToCart(name, price) {
    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    cartCount.textContent = cart.length;
    updateCartTotal();
}

function updateCartTotal() {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    displayCartItems();
}

function displayCartItems() {
    cartItemsList.innerHTML = '';
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItemsList.appendChild(listItem);
    });
}

function showCart() {
    cartModal.style.display = 'flex';
}

// Search Functionality
function searchProducts() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    productCards.forEach(card => {
        const productName = card.getAttribute('data-name').toLowerCase();
        if (productName.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
