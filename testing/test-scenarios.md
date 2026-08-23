# FoodOrder QE Project – Test Scenarios

## 1. Product Browsing & Search

| Scenario ID | Test Scenario |
|---|---|
| TS-001 | Verify that all available products are displayed correctly. |
| TS-002 | Verify that product details such as name, description, category, and price are displayed correctly. |
| TS-003 | Verify that users can search for a product using a valid product name. |
| TS-004 | Verify that product search is case-insensitive. |
| TS-005 | Verify that a suitable message is displayed when no products match the search. |
| TS-006 | Verify that users can filter products by category. |
| TS-007 | Verify that search and category filtering work together. |

---

## 2. Shopping Cart

| Scenario ID | Test Scenario |
|---|---|
| TS-008 | Verify that a user can add a product to the cart. |
| TS-009 | Verify that adding the same product increases its quantity. |
| TS-010 | Verify that a user can increase a product quantity. |
| TS-011 | Verify that a user can decrease a product quantity. |
| TS-012 | Verify that a product is removed when its quantity reaches zero. |
| TS-013 | Verify that a user can remove a product using the Remove button. |
| TS-014 | Verify that the cart item count is updated correctly. |
| TS-015 | Verify that the cart total is calculated correctly. |
| TS-016 | Verify that the cart total updates when quantities change. |

---

## 3. User Registration

| Scenario ID | Test Scenario |
|---|---|
| TS-017 | Verify successful registration with valid user details. |
| TS-018 | Verify that duplicate email registration is rejected. |
| TS-019 | Verify validation when required registration fields are missing. |
| TS-020 | Verify that passwords shorter than the minimum allowed length are rejected. |

---

## 4. User Login & Authentication

| Scenario ID | Test Scenario |
|---|---|
| TS-021 | Verify successful login with valid credentials. |
| TS-022 | Verify that login fails with an incorrect password. |
| TS-023 | Verify that login fails for a non-existing user. |
| TS-024 | Verify validation when login fields are missing. |
| TS-025 | Verify that a JWT token is generated after successful login. |
| TS-026 | Verify that protected APIs reject requests without a token. |
| TS-027 | Verify that protected APIs reject invalid or expired tokens. |

---

## 5. Order Placement

| Scenario ID | Test Scenario |
|---|---|
| TS-028 | Verify successful order placement with valid items and delivery address. |
| TS-029 | Verify that an order cannot be placed with an empty item list. |
| TS-030 | Verify that an order cannot be placed without a delivery address. |
| TS-031 | Verify that an order cannot contain a non-existing product. |
| TS-032 | Verify that an order cannot contain zero or negative quantities. |
| TS-033 | Verify that unavailable products cannot be ordered. |
| TS-034 | Verify that order totals are calculated using database product prices. |
| TS-035 | Verify that created orders are stored correctly in the database. |
| TS-036 | Verify that order items are stored correctly in the database. |

---

## 6. Order Retrieval

| Scenario ID | Test Scenario |
|---|---|
| TS-037 | Verify that an authenticated user can retrieve orders according to implemented access rules. |
| TS-038 | Verify that unauthorized users cannot access protected order endpoints. |

---

## 7. Admin Order Management

| Scenario ID | Test Scenario |
|---|---|
| TS-039 | Verify that an ADMIN can retrieve all orders. |
| TS-040 | Verify that a CUSTOMER cannot retrieve all orders. |
| TS-041 | Verify that an ADMIN can retrieve a specific order by ID. |
| TS-042 | Verify that a non-existing order returns the appropriate error. |
| TS-043 | Verify that an ADMIN can update an order status using an allowed status. |
| TS-044 | Verify that invalid order statuses are rejected. |
| TS-045 | Verify that a CUSTOMER cannot update an order status. |
| TS-046 | Verify that an ADMIN can cancel an existing order. |
| TS-047 | Verify that cancelling a non-existing order returns an appropriate error. |

---

## 8. Security & Authorization

| Scenario ID | Test Scenario |
|---|---|
| TS-048 | Verify that requests without a JWT token are rejected. |
| TS-049 | Verify that requests with an invalid JWT token are rejected. |
| TS-050 | Verify that CUSTOMER users cannot access ADMIN-only endpoints. |
| TS-051 | Verify that backend order calculations do not trust client-provided prices. |

---

## Summary

Total Test Scenarios: 51

These scenarios cover:

- Product browsing and filtering
- Shopping cart functionality
- User registration and login
- JWT authentication
- Order placement and validation
- Database persistence
- Admin order management
- Role-based authorization
- Basic security validation