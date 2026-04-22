const products = [
    {
        id: 1,
        name: "iPhone 14",
        price: 70000,
        image: "https://via.placeholder.com/150"
    },
    {
        id: 2,
        name: "Samsung Galaxy S23",
        price: 65000,
        image: "https://via.placeholder.com/150"
    },
    {
        id: 3,
        name: "Headphones",
        price: 2000,
        image: "https://via.placeholder.com/150"
    },
    {
        id: 4,
        name: "Laptop",
        price: 50000,
        image: "https://via.placeholder.com/150"
    }
];

let cart = [];

const productList = document.getElementById("product-list");
const cartDisplay = document.getElementById("cart-count");

function displayProducts(items) {
    productList.innerHTML = "";

    items.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
        `;

        productList.appendChild(card);
    });
}

function addToCart(productId, productName, price) {
    cart.push({ id: productId, name: productName, price: price });
    cartDisplay.innerText = cart.length;
    updateCartMenu();
}

function updateCartMenu() {
    const cartItemsDiv = document.getElementById("cart-items");
    cartItemsDiv.innerHTML = "";
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty</p>";
    } else {
        cart.forEach((item, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "cart-item";
            itemDiv.innerHTML = `
                <span>${item.name}</span>
                <span>₹${item.price}</span>
                <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
            `;
            cartItemsDiv.appendChild(itemDiv);
        });
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("cart-total").innerText = `Total: ₹${total}`;
    document.getElementById("checkout-total").innerText = `Total: ₹${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    cartDisplay.innerText = cart.length;
    updateCartMenu();
}

function toggleCartMenu() {
    const cartMenu = document.getElementById("cart-menu");
    cartMenu.style.display = cartMenu.style.display === "block" ? "none" : "block";
}

function openCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    document.getElementById("cart-menu").style.display = "none";
    document.getElementById("checkout-menu").style.display = "block";
}

function closeCheckout() {
    document.getElementById("checkout-menu").style.display = "none";
}

function completeOrder() {
    const form = document.getElementById("checkout-form");
    if (form.checkValidity()) {
        alert("Order placed successfully! Thank you for your purchase.");
        cart = [];
        cartDisplay.innerText = "0";
        form.reset();
        closeCheckout();
        updateCartMenu();
    }
}

// Search
document.getElementById("search").addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(value));
    displayProducts(filtered);
});

// Close menus when clicking outside
document.addEventListener("click", (e) => {
    const cartMenu = document.getElementById("cart-menu");
    const cartBtn = document.getElementById("cart-btn");
    if (!cartMenu.contains(e.target) && !cartBtn.contains(e.target)) {
        cartMenu.style.display = "none";
    }
});

// Initial load
displayProducts(products);
