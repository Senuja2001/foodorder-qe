# FoodOrder QE Project – Detailed Test Cases

## Test Case Format

| Field | Description |
|---|---|
| Test Case ID | Unique identifier for the test case |
| Scenario ID | Related test scenario |
| Title | Short description of what is being tested |
| Preconditions | Conditions required before testing |
| Test Steps | Steps to execute the test |
| Test Data | Data used during testing |
| Expected Result | Expected system behavior |
| Actual Result | Actual result after execution |
| Status | PASS / FAIL / BLOCKED / NOT EXECUTED |

---

# 1. Product Browsing & Search

## TC-001 — Verify Product Display

**Scenario ID:** TS-001

**Preconditions:**
- Frontend is running.
- Backend API is running.
- Products exist in the database.

**Test Steps:**

1. Open the FoodOrder application.
2. Navigate to the product listing page.

**Expected Result:**
- All available products are displayed.
- Each product shows the correct name, description, category, and price.

**Actual Result:** Not Executed

**Status:** NOT EXECUTED

---

## TC-002 — Search Product Using Valid Name

**Scenario ID:** TS-003

**Preconditions:**
- Products are available.

**Test Steps:**

1. Open the FoodOrder application.
2. Enter a valid product name in the search field.

**Test Data:**

```text
Chicken

---

# 3. User Registration

## TC-011 — Successful User Registration

**Scenario ID:** TS-017

**Preconditions:**
- Backend API is running.
- The test email is not already registered.

**Test Steps:**

1. Send a `POST` request to the registration endpoint.
2. Enter valid user details.
3. Send the request.

**Test Data:**

```json
{
  "full_name": "Test User",
  "email": "newuser@test.com",
  "password": "Test123"
}

---

# 5. Order Management

## TC-022 — Successful Order Placement

**Scenario ID:** TS-028

**Preconditions:**
- Backend API is running.
- Valid CUSTOMER JWT token is available.
- Products exist and are available.

**Test Steps:**

1. Send a `POST` request to `/api/orders`.
2. Add valid product IDs and quantities.
3. Provide a valid delivery address.
4. Send the request.

**Expected Result:**
- Order is created successfully.
- HTTP status `201 Created` is returned.
- Order items contain the correct `unit_price` and `subtotal`.
- Order is stored in the database.

**Actual Result:** Not Executed

**Status:** NOT EXECUTED

---

## TC-023 — Order Placement with Empty Items

**Scenario ID:** TS-029

**Preconditions:**
- Valid CUSTOMER JWT token is available.

**Test Steps:**

1. Send a `POST` request to `/api/orders`.
2. Provide an empty items array.

**Test Data:**

```json
{
  "items": [],
  "delivery_address": "Colombo, Sri Lanka"
}

