# FoodOrder QE Portfolio Project

FoodOrder QE is a Quality Engineering portfolio project for a food ordering application. It demonstrates manual testing, API testing, UI automation, database validation, defect documentation, and automated test reporting.

The project is organized to show how a Quality Engineer can test an application across multiple layers: requirements, UI, API, authentication, authorization, database persistence, calculations, and reporting.

## 1. Project Overview

FoodOrder is a sample food ordering system with a React frontend, Node.js/Express backend, and PostgreSQL database. The QE portfolio around it includes structured manual testing artifacts, Postman API automation, Newman execution support, Selenium UI automation, and PostgreSQL validation queries.

## 2. Project Objectives

- Validate key FoodOrder user flows.
- Document test planning and test design activities.
- Automate API validation using Postman and Newman.
- Automate UI checks using Selenium, Java, Maven, and JUnit.
- Validate PostgreSQL data consistency using read-only SQL queries.
- Demonstrate positive, negative, security, and role-based testing.
- Produce GitHub-ready evidence and reports for a QE portfolio.

## 3. Application Under Test

The application under test is FoodOrder, a food ordering application that supports product browsing, cart behavior, order creation, authentication APIs, and role-based backend endpoints.

Main application areas currently present in the repository:

- React frontend
- Node.js/Express backend
- PostgreSQL database integration
- REST API routes for products, categories, authentication, and orders

## 4. Technology Stack

| Area | Technology |
| --- | --- |
| Frontend | React, Vite, Axios |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| API Testing | Postman |
| API CLI Execution | Newman |
| API Reports | Newman JSON, Newman HTML Extra |
| UI Automation | Selenium WebDriver |
| UI Test Language | Java |
| UI Test Runner | JUnit 5 |
| Build Tool | Maven |
| Version Control | Git |

## 5. Testing Strategy

The testing strategy covers multiple layers:

- Manual validation through test plans, scenarios, and test cases.
- API testing for HTTP status codes, response structure, authentication, authorization, and negative cases.
- UI automation for product and cart behavior.
- Database testing for data integrity, persistence, relationships, and calculations.
- Evidence capture through reports and screenshots.

## 6. Test Coverage

Current portfolio coverage includes:

- Product listing validation
- Product search validation
- Product search result verification
- Add product to cart
- Verify cart item appears
- Increase/decrease cart quantity
- Remove product from cart
- Validate cart total
- User registration API validation
- Login API validation
- JWT authentication checks
- Role-based authorization checks
- Create order API validation
- Get order by ID API validation
- PostgreSQL order and order item consistency checks

Note: Authentication UI tests should be added after the frontend includes login, register, and logout pages.

## 7. Project Architecture

```text
React Frontend
      |
      | HTTP / Axios
      v
Node.js / Express API
      |
      | pg database client
      v
PostgreSQL Database
```

Testing layers:

```text
Manual Testing -> testing/
API Testing    -> api-testing/
UI Automation  -> ui-automation/
DB Testing     -> database-testing/
Reports        -> reports/
Evidence       -> evidence/
```

## 8. Folder Structure

```text
foodorder-qe/
├── application/
│   ├── backend/
│   └── frontend/
├── api-testing/
│   ├── postman/
│   ├── create-order-post-response-tests.js
│   ├── get-order-by-id-post-response-tests.js
│   └── README.md
├── ui-automation/
│   └── foodorder-ui-automation/
├── database-testing/
│   ├── sql/
│   └── database-test-report.md
├── testing/
├── docs/
├── reports/
├── evidence/
├── package.json
├── .gitignore
└── README.md
```

Detailed recommendation:

```text
docs/portfolio/recommended-folder-structure.md
```

## 9. How to Run API Tests

Start the backend application first:

```powershell
cd D:\foodorder-qe\application\backend
npm.cmd run dev
```

In Postman:

1. Import the FoodOrder collection.
2. Configure environment variables such as `baseUrl`, `customerToken`, `adminToken`, and `orderId`.
3. Run individual requests or the full collection.

Do not commit real JWT tokens or passwords.

## 10. How to Run Selenium Tests

Start the backend:

```powershell
cd D:\foodorder-qe\application\backend
npm.cmd run dev
```

Start the frontend:

```powershell
cd D:\foodorder-qe\application\frontend
npm.cmd run dev
```

Run Selenium tests:

```powershell
cd D:\foodorder-qe\ui-automation\foodorder-ui-automation
mvn test
```

## 11. How to Run Newman Tests

Install Newman dependencies from the project root:

```powershell
cd D:\foodorder-qe
npm install --save-dev newman newman-reporter-htmlextra
```

Place the exported Postman collection here:

```text
api-testing/postman/collections/FoodOrder-QE-API-Test-Automation.postman_collection.json
```

Place the local Postman environment here:

```text
api-testing/postman/environments/FoodOrder-QE.local.postman_environment.json
```

Run API tests and generate JSON results:

```powershell
npm run test:api
```

Run API tests and generate JSON plus HTML reports:

```powershell
npm run test:api:report
```

Generated reports:

```text
reports/newman/newman-results.json
reports/newman/newman-report.html
```

## 12. Database Testing

Database validation queries are stored in:

```text
database-testing/sql/foodorder-data-validation.sql
```

Database report:

```text
database-testing/database-test-report.md
```

The queries validate:

- User data integrity
- Product data integrity
- Order persistence
- Order item persistence
- Foreign key relationships
- Missing required values
- Invalid quantities
- Order total consistency
- Order item subtotal consistency

All SQL validation queries are read-only `SELECT` statements.

## 13. Bug Management

Bug reports are documented in:

```text
testing/bug-reports.md
```

Each defect should include:

- Defect ID
- Title
- Environment
- Preconditions
- Steps to reproduce
- Expected result
- Actual result
- Severity
- Status

## 14. Test Results

Manual and automation summaries are documented in:

```text
testing/test-summary-report.md
reports/newman/
ui-automation/foodorder-ui-automation/target/surefire-reports/
```

Generated local reports should be reviewed before adding portfolio evidence.

## 15. Screenshots and Evidence

Recommended evidence locations:

```text
evidence/postman/
evidence/selenium-tests/
evidence/database/
```

Evidence may include:

- Postman test result screenshots
- Newman HTML report screenshots
- Selenium execution screenshots
- Database query result screenshots
- Defect screenshots

## 16. Key QE Skills Demonstrated

- Requirements analysis
- Test planning
- Test scenario design
- Manual test case writing
- Defect reporting
- API testing with Postman
- Automated API assertions
- JWT authentication testing
- Role-based authorization testing
- Negative testing
- Security-focused validation
- Selenium UI automation
- Java test automation
- Maven project execution
- JUnit test design
- PostgreSQL database validation
- Newman CLI execution
- Automated test reporting
- Portfolio evidence organization

## 17. Future Improvements

- Add frontend login, register, and logout pages.
- Add Selenium authentication UI tests after auth pages are available.
- Add CI execution for Newman and Selenium tests.
- Add sanitized Postman example environment file.
- Add database seed scripts for repeatable test data.
- Add screenshots and generated reports as portfolio evidence.
- Add clearer traceability between requirements, test cases, and automation scripts.
