# MarketPeak E-commerce API Documentation

## Base URL
```
http://127.0.0.1:8000/api/
```

## Authentication
This API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_access_token>
```

## Endpoints

### Authentication

#### Register User
- **URL:** `POST /api/users/register/`
- **Description:** Create a new user account
- **Body:**
```json
{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123"
}
```
- **Response:**
```json
{
    "id": 2,
    "username": "testuser",
    "email": "test@example.com"
}
```

#### Login
- **URL:** `POST /api/users/login/`
- **Description:** Authenticate user and get JWT tokens
- **Body:**
```json
{
    "username": "testuser",
    "password": "testpass123"
}
```
- **Response:**
```json
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Refresh Token
- **URL:** `POST /api/users/token/refresh/`
- **Description:** Get new access token using refresh token
- **Body:**
```json
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### User Profile
- **URL:** `GET /api/users/profile/`
- **Description:** Get or update user profile
- **Headers:** `Authorization: Bearer <access_token>`
- **Response:**
```json
{
    "id": 1,
    "user": {
        "id": 2,
        "username": "testuser",
        "email": "test@example.com"
    },
    "bio": "",
    "avatar": null
}
```

### Products

#### List Products
- **URL:** `GET /api/products/products/`
- **Description:** Get all products (public access)
- **Response:**
```json
[
    {
        "id": 1,
        "name": "iPhone 15 Pro",
        "description": "Latest iPhone with advanced features",
        "price": "999.99",
        "image": null,
        "stock": 50,
        "category": {
            "id": 1,
            "name": "Electronics",
            "description": "Electronic devices and gadgets"
        },
        "created_at": "2025-07-11T01:35:09.196853Z",
        "updated_at": "2025-07-11T01:35:09.196906Z"
    }
]
```

#### Get Single Product
- **URL:** `GET /api/products/products/{id}/`
- **Description:** Get specific product details (public access)

#### Create Product
- **URL:** `POST /api/products/products/`
- **Description:** Create new product (authenticated only)
- **Headers:** `Authorization: Bearer <access_token>`

#### Update Product
- **URL:** `PUT /api/products/products/{id}/`
- **Description:** Update product (authenticated only)
- **Headers:** `Authorization: Bearer <access_token>`

#### Delete Product
- **URL:** `DELETE /api/products/products/{id}/`
- **Description:** Delete product (authenticated only)
- **Headers:** `Authorization: Bearer <access_token>`

### Categories

#### List Categories
- **URL:** `GET /api/products/categories/`
- **Description:** Get all categories (public access)
- **Response:**
```json
[
    {
        "id": 1,
        "name": "Electronics",
        "description": "Electronic devices and gadgets"
    }
]
```

#### CRUD Operations for Categories
- **GET:** `GET /api/products/categories/{id}/`
- **POST:** `POST /api/products/categories/` (authenticated)
- **PUT:** `PUT /api/products/categories/{id}/` (authenticated)
- **DELETE:** `DELETE /api/products/categories/{id}/` (authenticated)

### Cart

#### List User Cart
- **URL:** `GET /api/cart/carts/`
- **Description:** Get user's cart items
- **Headers:** `Authorization: Bearer <access_token>`
- **Response:**
```json
[
    {
        "id": 1,
        "user": 2,
        "items": [
            {
                "id": 1,
                "product": {
                    "id": 1,
                    "name": "iPhone 15 Pro",
                    "description": "Latest iPhone with advanced features",
                    "price": "999.99",
                    "image": null,
                    "stock": 50,
                    "category": {
                        "id": 1,
                        "name": "Electronics",
                        "description": "Electronic devices and gadgets"
                    },
                    "created_at": "2025-07-11T01:35:09.196853Z",
                    "updated_at": "2025-07-11T01:35:09.196906Z"
                },
                "quantity": 2
            }
        ],
        "created_at": "2025-07-11T01:35:09.196853Z",
        "updated_at": "2025-07-11T01:35:09.196906Z"
    }
]
```

#### Add Item to Cart
- **URL:** `POST /api/cart/cart-items/`
- **Description:** Add product to cart
- **Headers:** `Authorization: Bearer <access_token>`
- **Body:**
```json
{
    "product_id": 1,
    "quantity": 2
}
```

#### Update Cart Item
- **URL:** `PUT /api/cart/cart-items/{id}/`
- **Description:** Update cart item quantity
- **Headers:** `Authorization: Bearer <access_token>`

#### Remove Cart Item
- **URL:** `DELETE /api/cart/cart-items/{id}/`
- **Description:** Remove item from cart
- **Headers:** `Authorization: Bearer <access_token>`

## Sample Data Available

### Categories
- Electronics
- Clothing  
- Books

### Products
- iPhone 15 Pro ($999.99)
- Samsung Galaxy S24 ($899.99)
- MacBook Air M2 ($1199.99)
- Nike Air Max ($129.99)
- Adidas T-Shirt ($29.99)
- The Great Gatsby ($12.99)
- Python Programming Guide ($39.99)

## Testing with curl

### Register a user:
```bash
curl -X POST http://127.0.0.1:8000/api/users/register/ \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "email": "test@example.com", "password": "testpass123"}'
```

### Login:
```bash
curl -X POST http://127.0.0.1:8000/api/users/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass123"}'
```

### Get products:
```bash
curl -X GET http://127.0.0.1:8000/api/products/products/ \
  -H "Content-Type: application/json"
```

### Get user cart (with authentication):
```bash
curl -X GET http://127.0.0.1:8000/api/cart/carts/ \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-Type: application/json"
``` 