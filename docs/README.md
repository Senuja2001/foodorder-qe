# 3.2 Frontend architecture

We'll use:

**React + Vite**

The frontend communicates with the backend through REST APIs.

For example:

```text
Customer clicks "Login"        ↓
React sends: POST /api/auth/login        ↓
Express processes request        ↓
PostgreSQL checks user        ↓
Backend returns response        ↓
React shows dashboard
```

## Customer pages

We'll eventually have:

```text
/
├── Login
├── Register
├── Home
├── Products
├── Product Details
├── Cart
├── Checkout
├── Orders
├── Order Details
└── Profile
```

## Admin pages

```text
/admin
├── Login
├── Dashboard
├── Products
├── Add Product
├── Edit Product
├── Orders
└── Order Details
```
