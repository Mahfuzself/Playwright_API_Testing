## 📂 Project Structure

```bash
├── src/
│   ├── tests/            # API test files (GET, POST, PUT, PATCH)
│   ├── utils/            # Helpers, type definitions, request bodies
├── playwright.config.ts  # Playwright configuration
├── package.json          # Dependencies & scripts
├── tsconfig.json         # TypeScript configuration
├── .env                  # Environment variables (if used)
└── README.md             # Project documentation
## 📂 Project Setup & Usage

This project demonstrates API testing with **Playwright + TypeScript**, covering POST, GET, PUT, and PATCH requests using type-safe request bodies and query parameterization. The structure includes `src/tests` for API test files and `src/utils` for helpers and type definitions, along with `playwright.config.ts`, `package.json`, `tsconfig.json`, `.env`, and this `README.md`. To get started:  
```bash
git clone https://github.com/Mahfuzself/Playwright_API_Testing.git
cd Playwright_API_Testing
npm install
npx playwright test
## Clone My Repo 
git clone https://github.com/Mahfuzself/Playwright_API_Testing.git
cd Playwright_API_Testing
## Install dependencies
npm install
## Run Test
npx playwright test
