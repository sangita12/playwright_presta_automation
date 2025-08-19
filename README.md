# Playwright PrestaShop Automation

A comprehensive automated testing suite for PrestaShop e-commerce platform using Playwright with TypeScript. This project demonstrates robust QA practices with Page Object Model architecture, comprehensive test coverage, and proper error handling.

## 🚀 Features

- **Complete E-commerce Flow Testing**: Registration, Login, and Purchase flows
- **Page Object Model**: Clean, maintainable code architecture
- **Cross-browser Testing**: Chrome, Firefox, Safari, and Mobile Chrome
- **Comprehensive Test Coverage**: Positive, negative, and edge case scenarios
- **Dynamic Wait Handling**: Robust element waiting and error handling
- **Multiple Reporting Formats**: HTML, JSON, and JUnit reports

## 📋 Test Coverage

### Mandatory Flows
- ✅ **User Registration**: Complete registration flow with validation
- ✅ **User Sign-in**: Login functionality with error handling
- ✅ **Purchase Flow**: End-to-end shopping experience

## 🛠 Technical Stack

- **Framework**: Playwright
- **Language**: TypeScript
- **Architecture**: Page Object Model

## 📁 Project Structure

```
playwright_presta_automation/
├── src/
│   ├── config/
│   │   └── test-config.ts     # Test configuration settings
│   ├── pages/                 # Page Object Model classes
│   │   ├── BasePage.ts        # Base page with common functionality
│   │   ├── HomePage.ts        # Homepage interactions
│   │   ├── LoginPage.ts       # Login page functionality
│   │   ├── RegistrationPage.ts # Registration page
│   │   └── ProductPage.ts     # Product details and cart actions
│   ├── tests/                 # Test specifications
│   │   ├── registration.spec.ts    # Registration flow tests
│   │   ├── login.spec.ts          # Login functionality tests
│   │   └── purchase-flow.spec.ts  # End-to-end purchase tests
│   └── utils/                 # Utility functions
│       └── test-data.ts       # Test data generation
├── tests-examples/           # Example test files
│   └── demo-todo-app.spec.ts
├── playwright.config.ts      # Playwright configuration
├── package.json             # Dependencies and scripts
├── package-lock.json        # Dependency lock file
└── README.md               # Project documentation
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd playwright_presta_automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npm run install:browsers
   ```

## 🧪 Running Tests

### Basic Test Execution

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with UI mode (interactive)
npm run test:ui

# Run specific test file
npx playwright test registration.spec.ts

# Run tests in debug mode
npm run test:debug
```

### Cross-browser Testing

```bash
# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run on mobile
npx playwright test --project=mobile-chrome
```

### Test Filtering

```bash
# Run tests by tag/describe block
npx playwright test --grep "Registration"
npx playwright test --grep "Purchase Flow"

# Run specific test
npx playwright test --grep "should successfully register"
```

## 📊 Test Reports

### Viewing Reports

```bash
# Open HTML report
npm run test:report

# View test results in terminal
npx playwright test --reporter=list
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file for environment-specific configurations:

```env
BASE_URL=https://demo.prestashop.com/#/en/front
HEADLESS=true
TIMEOUT=30000
```


## 📝 Test Data Management

```typescript
// Generate user data
const userData = TestData.generateUserData();
// Returns: { firstName, lastName, email, password, address }

// Get predefined credentials
const credentials = TestData.getValidCredentials();
```

## 🎯 Best Practices Implemented

### Page Object Model
- Separation of page logic from test logic
- Reusable page methods and locators
- Inheritance for common functionality

### Dynamic Waits
- Smart waiting for elements
- Network idle state handling
- Timeout management

### Test Organization
- Logical test grouping
- Clear test descriptions
- Proper setup and teardown

## 🔍 Debugging Tips

### Common Issues

1. **Element Not Found**
   ```bash
   # Run with debug mode to inspect elements
   npm run test:debug
   ```

2. **Timing Issues**
   ```bash
   # Increase timeout in playwright.config.ts
   actionTimeout: 60000
   ```

3. **Browser Issues**
   ```bash
   # Reinstall browsers
   npm run install:browsers
   ```

**Note**: This automation suite is designed for the PrestaShop demo site. Adapt selectors and flows as needed for different PrestaShop installations.
