# FoodOrder QE Project – Test Summary Report

## 1. Project Information

| Field | Details |
|---|---|
| Project Name | FoodOrder QE Portfolio Project |
| Test Phase | Functional, API, Database, Security & Authorization Testing |
| Test Environment | Windows 11 |
| Frontend | React + Vite |
| Backend | Node.js + Express.js |
| Database | PostgreSQL |
| Testing Tools | Postman, pgAdmin, Browser Developer Tools, Visual Studio Code |

---

# 2. Testing Objective

The objective of this testing phase was to verify the quality, functionality, reliability, and security of the FoodOrder application.

Testing covered the main user workflows, including:

- Product browsing and searching
- Category filtering
- Shopping cart functionality
- User registration
- User login
- JWT authentication
- Protected API access
- Order placement
- Order validation
- Database price calculations
- Admin order management
- Role-based authorization
- Basic security validation

---

# 3. Test Execution Summary

A total of **40 detailed test cases** were prepared and executed.

| Test Area | Test Case Range | Total |
|---|---|---:|
| Product Browsing & Search | TC-001 – TC-005 | 5 |
| Shopping Cart | TC-006 – TC-010 | 5 |
| Registration | TC-011 – TC-014 | 4 |
| Login & Authentication | TC-015 – TC-021 | 7 |
| Order Management | TC-022 – TC-027 | 6 |
| Admin Order Management | TC-028 – TC-036 | 9 |
| Security & Authorization | TC-037 – TC-040 | 4 |
| **Total** | **TC-001 – TC-040** | **40** |

---

# 4. Test Results Summary

Update the following numbers according to the results recorded in `test-cases.md`.

| Status | Count |
|---|---:|
| PASS | [Enter total PASS count] |
| FAIL | [Enter total FAIL count] |
| BLOCKED | [Enter total BLOCKED count] |
| NOT EXECUTED | 0 |
| **TOTAL** | **40** |

---

# 5. Testing Coverage

The following areas were covered during testing.

## Functional Testing

The following functionality was verified:

- Product display
- Product search
- Case-insensitive search
- No-result handling
- Category filtering
- Add to cart
- Update cart quantities
- Remove cart items
- Cart total calculations

## Authentication Testing

The following areas were tested:

- Successful registration
- Duplicate email validation
- Missing required fields
- Password validation
- Successful login
- Incorrect password handling
- Non-existing user login
- JWT token generation
- Missing token validation
- Invalid token validation

## Order Testing

The following functionality was tested:

- Successful order placement
- Empty order validation
- Missing delivery address validation
- Non-existing product validation
- Zero quantity validation
- Database price validation
- Order subtotal calculations
- Order persistence

## Admin & Authorization Testing

The following functionality was tested:

- Admin access to all orders
- Admin access to individual orders
- Order status updates
- Order cancellation
- Invalid order ID handling
- Invalid order status validation
- CUSTOMER access restrictions
- Missing JWT token handling
- Invalid JWT token handling
- Role-based authorization

---

# 6. Defect Summary

During testing, **3 defects** were identified in the order creation workflow.

| Bug ID | Description | Severity | Status |
|---|---|---|---|
| BUG-001 | Missing database column / backend schema mismatch during order creation | High | CLOSED |
| BUG-002 | `unit_price` was not correctly stored during order creation | High | CLOSED |
| BUG-003 | `subtotal` was null during order item creation | High | CLOSED |

All identified defects were reproduced, analyzed, resolved, and successfully retested.

---

# 7. Key Quality Findings

The testing process confirmed that the FoodOrder application supports the core functional workflows.

Key areas verified include:

- Users can browse and search products.
- Shopping cart operations function correctly.
- User registration and login workflows operate as expected.
- JWT authentication protects restricted endpoints.
- Orders are validated before creation.
- Product prices are retrieved from the database instead of trusting manipulated client-side values.
- Order item subtotals are calculated correctly.
- PostgreSQL correctly stores order and order item information.
- ADMIN users can manage orders.
- CUSTOMER users are restricted from ADMIN-only endpoints.
- Missing and invalid JWT tokens are rejected.

---

# 8. Defect Retesting

All three identified defects were retested after fixes were applied.

| Bug ID | Retest Result | Final Status |
|---|---|---|
| BUG-001 | Order creation completed successfully after backend/database synchronization. | PASS / CLOSED |
| BUG-002 | `unit_price` was successfully retrieved and stored. | PASS / CLOSED |
| BUG-003 | `subtotal` was correctly calculated and stored. | PASS / CLOSED |

---

# 9. Exit Criteria

The planned testing activities have been completed.

The following exit criteria were achieved:

- All 40 planned test cases were executed.
- Core application functionality was tested.
- Authentication and authorization were tested.
- Order functionality and database persistence were verified.
- ADMIN and CUSTOMER access restrictions were verified.
- Identified high-severity defects were resolved and retested.
- Professional testing documentation was completed.

---

# 10. Final Quality Assessment

Based on the completed functional, API, database, authentication, authorization, and security testing, the FoodOrder application successfully supports its core workflows.

The defects identified during testing were primarily related to inconsistencies between the backend order creation logic and the PostgreSQL database schema. These issues were resolved and successfully retested.

The application demonstrates:

- Functional correctness for core user workflows
- Input validation and negative testing coverage
- JWT-based authentication
- Role-based authorization
- Database integrity for order creation
- Backend-controlled product pricing
- Structured defect identification and resolution

**Final Assessment:**

The FoodOrder application is considered **functionally stable for the tested scope** and suitable as a Quality Engineering portfolio project.

---

# 11. Test Conclusion

A total of **40 test cases** were executed across seven major testing areas.

The project also included the identification, documentation, resolution, and retesting of **3 high-severity defects**.

The completed testing artifacts include:

- `test-plan.md`
- `test-scenarios.md`
- `test-cases.md`
- `bug-reports.md`
- `test-summary-report.md`

This testing process demonstrates an end-to-end Quality Engineering workflow, from test planning and scenario design to test execution, defect reporting, retesting, and final quality assessment.