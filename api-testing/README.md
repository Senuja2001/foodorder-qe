# FoodOrder API Testing and Newman Setup

This folder stores Postman assets and API automation support files for the FoodOrder QE portfolio.

## Folder Structure

```text
api-testing/
├── postman/
│   ├── collections/
│   │   └── FoodOrder-QE-API-Test-Automation.postman_collection.json
│   └── environments/
│       └── FoodOrder-QE.local.postman_environment.json
├── create-order-post-response-tests.js
├── get-order-by-id-post-response-tests.js
└── README.md
```

Generated Newman reports are stored separately:

```text
reports/
└── newman/
    ├── newman-results.json
    └── newman-report.html
```

## Install Newman

Run from the project root:

```powershell
cd D:\foodorder-qe
npm install --save-dev newman newman-reporter-htmlextra
```

## Export Postman Assets

Export the Postman collection and place it here:

```text
D:\foodorder-qe\api-testing\postman\collections\FoodOrder-QE-API-Test-Automation.postman_collection.json
```

Export a local Postman environment and place it here:

```text
D:\foodorder-qe\api-testing\postman\environments\FoodOrder-QE.local.postman_environment.json
```

Do not commit real JWT tokens, passwords, or secrets. The local environment file is ignored by Git.

## Run the Collection

```powershell
cd D:\foodorder-qe
npm run test:api
```

This runs the collection and generates:

```text
D:\foodorder-qe\reports\newman\newman-results.json
```

## Generate JSON and HTML Reports

```powershell
cd D:\foodorder-qe
npm run test:api:report
```

This generates:

```text
D:\foodorder-qe\reports\newman\newman-results.json
D:\foodorder-qe\reports\newman\newman-report.html
```

## Direct PowerShell Commands

Run collection with JSON output:

```powershell
npx newman run .\api-testing\postman\collections\FoodOrder-QE-API-Test-Automation.postman_collection.json `
  --environment .\api-testing\postman\environments\FoodOrder-QE.local.postman_environment.json `
  --reporters cli,json `
  --reporter-json-export .\reports\newman\newman-results.json
```

Run collection with JSON and HTML report:

```powershell
npx newman run .\api-testing\postman\collections\FoodOrder-QE-API-Test-Automation.postman_collection.json `
  --environment .\api-testing\postman\environments\FoodOrder-QE.local.postman_environment.json `
  --reporters cli,json,htmlextra `
  --reporter-json-export .\reports\newman\newman-results.json `
  --reporter-htmlextra-export .\reports\newman\newman-report.html `
  --reporter-htmlextra-title "FoodOrder API Test Report"
```

## Required Environment Variables

The Postman environment should contain non-secret placeholders or local-only values such as:

```text
baseUrl
customerToken
adminToken
orderId
```

Avoid committing token values. Refresh JWTs locally when needed.
