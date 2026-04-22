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

let cartCount = 0;

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
            <button onclick="addToCart()">Add to Cart</button>
        `;

        productList.appendChild(card);
    });
}

function addToCart() {
    cartCount++;
    cartDisplay.innerText = cartCount;
}

// Search
document.getElementById("search").addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(value));
    displayProducts(filtered);
});

// Initial load
displayProducts(products);
