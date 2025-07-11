// API base URL
const API_BASE = `${window.location.protocol}//${window.location.hostname}:8000/api`;

// Token management
function setToken(token) {
    localStorage.setItem('access_token', token);
}
function getToken() {
    return localStorage.getItem('access_token');
}
function removeToken() {
    localStorage.removeItem('access_token');
}

// Helper for authenticated fetch
function authFetch(url, options = {}) {
    const token = getToken();
    options.headers = options.headers || {};
    if (token) {
        options.headers['Authorization'] = 'Bearer ' + token;
    }
    return fetch(url, options);
}

// API: Products
function fetchProducts() {
    return fetch(`${API_BASE}/products/products/`).then(res => res.json());
}
function fetchCategories() {
    return fetch(`${API_BASE}/products/categories/`).then(res => res.json());
}

// API: Auth
function registerUser(username, email, password) {
    return fetch(`${API_BASE}/users/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    }).then(res => res.json());
}
function loginUser(username, password) {
    return fetch(`${API_BASE}/users/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }).then(res => res.json());
}
function fetchProfile() {
    return authFetch(`${API_BASE}/users/profile/`).then(res => res.json());
}

// API: Cart
function fetchCart() {
    return authFetch(`${API_BASE}/cart/carts/`).then(res => res.json());
}
function addToCart(product_id, quantity) {
    return authFetch(`${API_BASE}/cart/cart-items/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id, quantity })
    }).then(res => res.json());
}
function updateCartItem(item_id, quantity) {
    return authFetch(`${API_BASE}/cart/cart-items/${item_id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
    }).then(res => res.json());
}
function removeCartItem(item_id) {
    return authFetch(`${API_BASE}/cart/cart-items/${item_id}/`, {
        method: 'DELETE' });
}

function placeOrder() {
    return authFetch(`${API_BASE}/cart/orders/place/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
}

// Export functions for use in other scripts
window.api = {
    setToken, getToken, removeToken,
    fetchProducts, fetchCategories,
    registerUser, loginUser, fetchProfile,
    fetchCart, addToCart, updateCartItem, removeCartItem,
    placeOrder
}; 