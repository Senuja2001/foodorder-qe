# FoodOrder QE Project – Bug Reports

## Project Information

| Field | Details |
|---|---|
| Project | FoodOrder QE Portfolio Project |
| Test Environment | Windows 11 / React / Node.js / Express.js / PostgreSQL |
| Testing Tools | Postman, pgAdmin, Browser Developer Tools |
| Test Phase | Functional, API, Database, Security & Authorization Testing |

---

# Bug Report Format

Each defect will be documented using the following information:

- **Bug ID**
- **Title**
- **Related Test Case**
- **Severity**
- **Priority**
- **Environment**
- **Preconditions**
- **Steps to Reproduce**
- **Expected Result**
- **Actual Result**
- **Status**
- **Root Cause / Notes**

---

# BUG-001 — Order Creation Failed Due to Missing `price` Column

**Related Test Case:** TC-022 — Successful Order Placement

**Severity:** High

**Priority:** High

**Environment:**
- Windows 11
- Node.js / Express.js
- PostgreSQL
- Postman

**Preconditions:**
- Backend server is running.
- Valid product records exist.
- Valid authenticated user token is available.

**Steps to Reproduce:**

1. Send a `POST` request to `/api/orders`.
2. Provide valid product IDs and quantities.
3. Provide a valid delivery address.
4. Send the request.

**Expected Result:**

- The order should be created successfully.
- Order items should be stored in the `order_items` table.

**Actual Result:**

The API returned a database error indicating that the `price` column did not exist in the `order_items` table.

**Root Cause / Notes:**

The backend order creation logic and PostgreSQL database schema were not synchronized.

**Resolution:**

The database schema was updated and the backend order item logic was corrected.

**Status:** CLOSED

---

# BUG-002 — Order Creation Failed Because `unit_price` Was Null

**Related Test Case:** TC-022 — Successful Order Placement

**Severity:** High

**Priority:** High

**Environment:**
- Windows 11
- Node.js / Express.js
- PostgreSQL
- Postman

**Preconditions:**
- Backend server is running.
- Valid product exists.
- Valid authenticated user token is available.

**Steps to Reproduce:**

1. Send a valid order creation request.
2. Include a valid `product_id` and `quantity`.
3. Send the request.

**Expected Result:**

The backend should retrieve the product price and save it as `unit_price`.

**Actual Result:**

The API returned an error:

```text
null value in column "unit_price" of relation "order_items"
violates not-null constraint