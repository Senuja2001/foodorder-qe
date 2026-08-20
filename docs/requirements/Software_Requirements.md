# FoodOrder - Software Requirements Specification

## 1. Project Overview

FoodOrder is a web-based food ordering and restaurant management system.

The system provides two main user roles:

- Customer
- Administrator

Customers can browse food products, manage their cart, place orders, and track their orders.

Administrators can manage products and orders through an administration interface.

---

# 2. User Roles

## 2.1 Customer

A customer can:

- Register an account
- Log in
- Log out
- Manage profile information
- Browse food products
- Search products
- Filter products
- View product details
- Add products to cart
- Update cart quantities
- Remove products from cart
- Checkout
- Place orders
- View order history
- View order details
- Cancel eligible orders

## 2.2 Administrator

An administrator can:

- Log in
- Log out
- View dashboard
- Manage products
- Manage orders
- Update order status

---

# 3. Functional Requirements

## Authentication

### FR-001 - Customer Registration

The system shall allow a new customer to create an account using:

- Full name
- Email address
- Password
- Confirm password

The system shall validate all required registration fields.

### FR-002 - Customer Login

The system shall allow registered customers to log in using a valid email address and password.

### FR-003 - Customer Logout

The system shall allow authenticated customers to log out securely.

### FR-004 - Admin Login

The system shall allow authorized administrators to log in using valid administrator credentials.

---

## Customer Profile

### FR-005 - View Profile

An authenticated customer shall be able to view their profile information.

---

## Product Management

### FR-006 - Browse Products

Customers shall be able to view available food products.

### FR-007 - Search Products

Customers shall be able to search products using product names or keywords.

### FR-008 - Filter Products

Customers shall be able to filter products by category.

### FR-009 - View Product Details

Customers shall be able to view detailed information about a selected product.

### FR-010 - Add Product

Administrators shall be able to add a new product.

### FR-011 - Update Product

Administrators shall be able to update an existing product.

### FR-012 - Delete Product

Administrators shall be able to delete an existing product.

---

## Shopping Cart

### FR-013 - Add to Cart

Customers shall be able to add available products to their shopping cart.

### FR-014 - Update Cart Quantity

Customers shall be able to increase or decrease the quantity of products in their cart.

### FR-015 - Remove Cart Item

Customers shall be able to remove products from their cart.

### FR-016 - Calculate Cart Total

The system shall calculate the cart subtotal and total amount correctly based on selected products and quantities.

---

## Checkout and Orders

### FR-017 - Checkout

Authenticated customers shall be able to proceed to checkout when the cart contains at least one valid product.

### FR-018 - Place Order

Customers shall be able to place an order after providing the required checkout information.

### FR-019 - Generate Order

The system shall generate a unique order identifier after successful order placement.

### FR-020 - View Order History

Customers shall be able to view their previous orders.

### FR-021 - View Order Details

Customers shall be able to view the details of an individual order.

### FR-022 - Cancel Order

Customers shall be able to cancel an order when the order status allows cancellation.

---

## Administration

### FR-023 - Admin Dashboard

Administrators shall be able to view a dashboard containing relevant product and order information.

### FR-024 - View Orders

Administrators shall be able to view customer orders.

### FR-025 - View Order Details

Administrators shall be able to view detailed information about an order.

### FR-026 - Update Order Status

Administrators shall be able to update order status.

---

# 4. Non-Functional Requirements

### NFR-001 - Usability

The application should provide a clear and easy-to-use interface.

### NFR-002 - Performance

Normal user actions should receive a response within an acceptable period under normal test conditions.

### NFR-003 - Security

Unauthorized users shall not be able to access protected customer or administrator functionality.

### NFR-004 - Data Integrity

The system shall maintain accurate product, customer, cart, and order data.

### NFR-005 - Compatibility

The web application should support modern browsers such as Google Chrome and Microsoft Edge.

### NFR-006 - Reliability

The system should handle valid user operations consistently without unexpected failures.

---

# 5. Order Statuses

The system shall support the following order statuses:

- Pending
- Confirmed
- Preparing
- Ready
- Completed
- Cancelled

---

# 6. Main Business Rules

### BR-001

A customer must be authenticated before placing an order.

### BR-002

A customer cannot place an order when the cart is empty.

### BR-003

Product quantity must be greater than zero.

### BR-004

Customers can cancel only orders that are eligible for cancellation.

### BR-005

Only administrators can create, update, and delete products.

### BR-006

Only administrators can update order statuses.

### BR-007

Each order must have a unique order identifier.

### BR-008

The total order amount must equal the sum of the selected product prices and quantities.