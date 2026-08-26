# FoodOrder Database Test Report

## 1. Database Testing Overview

This report documents database validation activities for the FoodOrder Quality Engineering portfolio project. The purpose of the database testing is to verify that key application transactions are persisted correctly and that relational data remains accurate, complete, and internally consistent.

The validation approach focuses on read-only SQL checks against PostgreSQL tables used by the FoodOrder application. These checks are designed to detect missing required values, invalid quantities, broken relationships, incorrect subtotals, and incorrect order totals.

## 2. PostgreSQL Environment

| Item | Description |
| --- | --- |
| Database | PostgreSQL |
| Application | FoodOrder |
| Access Type | Read-only validation queries |
| Data Modification | Not performed |
| Query Type | `SELECT` only |
| Environment Variables | Database credentials are stored outside the report and must not be committed |

## 3. Tables Tested

The following FoodOrder tables are covered:

- `users`
- `products`
- `orders`
- `order_items`

Supporting relationship checks may also reference `categories` where product category integrity is validated.

## 4. Test Scenarios

| Scenario ID | Scenario | QE Objective |
| --- | --- | --- |
| DB-001 | Validate user required fields | Ensure registered users have complete identity and authentication data |
| DB-002 | Validate duplicate user emails | Confirm account uniqueness and prevent ambiguous login behavior |
| DB-003 | Validate product required fields | Ensure product catalog records are usable by the storefront |
| DB-004 | Validate product pricing | Prevent invalid product prices from affecting cart/order totals |
| DB-005 | Validate order persistence | Confirm customer orders are saved with required business fields |
| DB-006 | Validate order item persistence | Confirm each order line item stores product, quantity, price, and subtotal |
| DB-007 | Validate foreign key relationships | Detect orphaned orders or order items |
| DB-008 | Validate quantity rules | Ensure ordered quantities are greater than zero |
| DB-009 | Validate item subtotal calculation | Confirm `subtotal = unit_price × quantity` |
| DB-010 | Validate order total calculation | Confirm `orders.total_amount = SUM(order_items.subtotal)` |

## 5. SQL Validation Queries

The complete SQL validation suite is stored here:

```text
database-testing/sql/foodorder-data-validation.sql
```

Key query categories include:

- User data integrity checks
- Product data integrity checks
- Order persistence checks
- Order item persistence checks
- Foreign key relationship checks
- Missing required value checks
- Invalid quantity checks
- Order total consistency checks
- Order item subtotal consistency checks

## 6. Expected Results

For exception-style validation queries, the expected result is:

```text
0 rows returned
```

If a query returns rows, those rows represent records that need investigation.

For summary-style validation queries, such as order persistence detail, the expected result is:

```text
Rows may be returned, but calculated values should match recorded values.
```

## 7. Actual Results

Actual results should be recorded after executing the SQL validation suite in the local PostgreSQL environment.

| Query Area | Expected Result | Actual Result | Status |
| --- | --- | --- | --- |
| User data integrity | 0 issue rows | Pending execution | Pending |
| Product data integrity | 0 issue rows | Pending execution | Pending |
| Order persistence | 0 issue rows | Pending execution | Pending |
| Order item persistence | 0 issue rows | Pending execution | Pending |
| Foreign key relationships | 0 orphan rows | Pending execution | Pending |
| Invalid quantities | 0 issue rows | Pending execution | Pending |
| Order total consistency | 0 mismatch rows | Pending execution | Pending |
| Item subtotal consistency | 0 mismatch rows | Pending execution | Pending |

## 8. Data Integrity Validation

Data integrity validation confirms that required business data exists and conforms to expected rules. For FoodOrder, this includes user identity fields, valid user roles, product names, product prices, order statuses, delivery addresses, and required order item values.

From a Quality Engineering perspective, these checks help identify issues that may not be visible in UI or API responses but can cause downstream failures in login, checkout, reporting, and order management.

## 9. Order Persistence Validation

Order persistence validation confirms that a submitted order creates durable records in the `orders` table and associated records in the `order_items` table.

The validation checks ensure:

- Each order belongs to a valid user.
- Each order has a valid status.
- Each order has a delivery address.
- Each order has at least one order item.
- Each order item belongs to an existing order.

## 10. Calculation Validation

Calculation validation focuses on financial consistency:

```text
order_items.subtotal = order_items.unit_price × order_items.quantity
```

and:

```text
orders.total_amount = SUM(order_items.subtotal)
```

These checks are important because calculation defects can directly affect checkout totals, customer trust, and order records.

## 11. Identified Issues

No final database issues are recorded in this report yet because the validation queries must be executed against the target PostgreSQL database first.

Any returned rows from the exception queries should be documented with:

- Query name
- Affected table
- Affected record ID
- Expected result
- Actual result
- Severity
- Recommended fix

## 12. Evidence References

Recommended evidence locations:

```text
evidence/database/
reports/newman/
testing/bug-reports.md
testing/test-summary-report.md
```

Suggested evidence files:

- SQL query execution screenshots
- Query result exports
- Newman API execution reports
- Screenshots of related defects

## 13. Final Conclusion

The FoodOrder database validation suite provides a professional read-only approach for verifying PostgreSQL data consistency. It supports QE portfolio evidence by connecting API order creation, cart calculations, and persisted database records through repeatable SQL checks.

Final pass/fail status should be updated after executing the SQL validation queries and recording actual results.
