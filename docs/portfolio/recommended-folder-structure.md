# Recommended FoodOrder QE Portfolio Folder Structure

The following structure separates application source code, manual testing assets, automation, database validation, documentation, reports, and evidence.

```text
foodorder-qe/
├── application/
│   ├── backend/
│   └── frontend/
│
├── api-testing/
│   ├── postman/
│   │   ├── collections/
│   │   │   └── FoodOrder-QE-API-Test-Automation.postman_collection.json
│   │   └── environments/
│   │       └── FoodOrder-QE.local.postman_environment.json
│   ├── create-order-post-response-tests.js
│   ├── get-order-by-id-post-response-tests.js
│   └── README.md
│
├── ui-automation/
│   └── foodorder-ui-automation/
│       ├── src/
│       │   ├── main/java/
│       │   └── test/java/
│       └── pom.xml
│
├── database-testing/
│   ├── sql/
│   │   └── foodorder-data-validation.sql
│   └── database-test-report.md
│
├── testing/
│   ├── test-plan.md
│   ├── test-scenarios.md
│   ├── test-cases.md
│   ├── bug-reports.md
│   └── test-summary-report.md
│
├── docs/
│   ├── requirements/
│   └── portfolio/
│
├── reports/
│   └── newman/
│
├── evidence/
│   ├── postman/
│   ├── selenium-tests/
│   └── database/
│
├── package.json
├── .gitignore
└── README.md
```

## Portfolio Organization Principles

- Keep `application/` focused on the application under test.
- Keep `api-testing/` focused on Postman collections, Newman execution, and API automation assets.
- Keep `ui-automation/` focused on Java, Maven, Selenium, and JUnit tests.
- Keep `database-testing/` focused on PostgreSQL validation queries and database test reporting.
- Keep `testing/` focused on manual QE artifacts such as test plans, scenarios, test cases, defects, and summaries.
- Keep `reports/` for generated outputs.
- Keep `evidence/` for screenshots and portfolio proof.

## Security Guidance

- Do not commit `.env` files.
- Do not commit JWT tokens.
- Do not commit real passwords.
- Do not commit local Postman environment files containing secrets.
- Commit sanitized examples only when needed.
