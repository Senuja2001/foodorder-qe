# FoodOrder QE Project – Test Plan

## 1. Introduction

This Test Plan defines the testing approach, scope, objectives, resources, and strategy for the FoodOrder application.

The FoodOrder application is a full-stack food ordering system developed as a Quality Engineering portfolio project. The system includes product browsing, search and filtering, shopping cart functionality, user authentication, order placement, JWT-based authorization, and role-based admin order management.

The purpose of this testing effort is to verify that the application functions correctly, handles invalid inputs appropriately, protects restricted resources, and maintains data integrity between the frontend, backend, and PostgreSQL database.

---

## 2. Test Objectives

The main objectives of testing are:

- Verify that users can browse and search products correctly.
- Verify category filtering functionality.
- Verify shopping cart operations.
- Verify user registration and login.
- Verify password validation and duplicate user handling.
- Verify JWT authentication.
- Verify protected API access.
- Verify order placement and database persistence.
- Verify order calculations and prices.
- Verify invalid order handling.
- Verify unauthorized access handling.
- Verify role-based access control.
- Verify admin order management.
- Identify and document defects found during testing.

---

## 3. Scope

### In Scope

The following modules are included in testing:

#### Product Management

- View products.
- Search products.
- Filter products by category.
- Handle no-result searches.

#### Shopping Cart

- Add products to the cart.
- Increase product quantity.
- Decrease product quantity.
- Remove products from the cart.
- Verify cart count.
- Verify cart total calculations.

#### Authentication

- User registration.
- Duplicate email validation.
- Required field validation.
- Password length validation.
- User login.
- Invalid login attempts.
- JWT token generation.

#### Order Management

- Create orders.
- Validate order items.
- Validate delivery address.
- Verify calculated order totals.
- Verify database persistence.
- Retrieve orders.
- Test unauthorized order access.

#### Admin Management

- View all orders.
- View a single order.
- Update order status.
- Cancel orders.
- Verify role-based authorization.
- Verify customer access restrictions.

---

## 4. Out of Scope

The following areas are currently outside the scope of this testing phase:

- Payment gateway integration.
- Real delivery tracking.
- Email notifications.
- Performance/load testing.
- Mobile application testing.
- Cross-browser compatibility testing beyond basic verification.
- Production deployment testing.

---

## 5. Test Strategy

The project will use the following testing approaches:

### Manual Testing

Manual testing will be performed on:

- Frontend user workflows.
- Functional testing.
- Input validation.
- Negative testing.
- Boundary testing.
- Error handling.
- Role-based access testing.

### API Testing

Postman will be used to test:

- Product APIs.
- Authentication APIs.
- Order APIs.
- Admin APIs.
- HTTP status codes.
- Request and response validation.
- JWT authentication.
- Unauthorized access scenarios.

### Database Testing

PostgreSQL will be used to verify:

- User data persistence.
- Order creation.
- Order item creation.
- Data relationships.
- Price and subtotal calculations.
- Data integrity.

### Security Testing

Basic security testing will include:

- Missing JWT token.
- Invalid JWT token.
- Expired JWT token.
- Customer attempting to access admin endpoints.
- Backend validation of product prices.

---

## 6. Test Environment

### Operating System

Windows 11

### Frontend

- React
- Vite
- JavaScript

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL

### Testing Tools

- Postman
- pgAdmin
- Browser Developer Tools
- Visual Studio Code

---

## 7. Test Deliverables

The following testing artifacts will be produced:

- Test Plan
- Test Scenarios
- Detailed Test Cases
- Test Execution Results
- Bug Reports
- Test Summary Report
- API Test Collection
- UI Automation Test Suite
- GitHub Documentation

---

## 8. Entry Criteria

Testing can begin when:

- The application is running.
- Frontend is accessible.
- Backend APIs are running.
- PostgreSQL database is connected.
- Test data is available.
- Required user accounts are available.
- API endpoints are accessible.

---

## 9. Exit Criteria

Testing will be considered complete when:

- All planned test cases have been executed.
- Critical and high-severity defects have been resolved or documented.
- Core application workflows pass successfully.
- Authentication and authorization testing is completed.
- Order and database functionality is verified.
- A final test summary report is created.

---

## 10. Risks

Potential testing risks include:

- Database schema changes affecting APIs.
- JWT token expiration during testing.
- Test data inconsistencies.
- Backend and database schema mismatches.
- Limited time for automation testing.
- Changes to application functionality during testing.

---

## 11. Conclusion

This Test Plan provides a structured approach for testing the FoodOrder application. The testing process will cover functional, negative, API, database, authentication, authorization, and role-based testing to evaluate the quality and reliability of the application.

The final testing results will be documented in the Test Summary Report.