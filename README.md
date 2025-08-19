# Playwright PrestaShop Automation

A comprehensive automated testing suite for PrestaShop e-commerce platform using Playwright with TypeScript. This project demonstrates robust QA practices with Page Object Model architecture, comprehensive test coverage, and proper error handling.

## 🚀 Features

- **Complete E-commerce Flow Testing**: Registration, Login, and Purchase flows
- **Page Object Model**: Clean, maintainable code architecture
- **Cross-browser Testing**: Chrome, Firefox, Safari, and Mobile Chrome
- **Comprehensive Test Coverage**: Positive, negative, and edge case scenarios
- **Dynamic Wait Handling**: Robust element waiting and error handling
- **Test Data Management**: Faker.js integration for realistic test data
- **Multiple Reporting Formats**: HTML, JSON, and JUnit reports
- **CI/CD Ready**: Configured for continuous integration environments

## 📋 Test Coverage

### Mandatory Flows
- ✅ **User Registration**: Complete registration flow with validation
- ✅ **User Sign-in**: Login functionality with error handling
- ✅ **Purchase Flow**: End-to-end shopping experience

### Additional QA Scenarios
- **Security Testing**: SQL injection, XSS prevention
- **Edge Cases**: Maximum input lengths, special characters
- **Error Handling**: Network issues, session timeouts
- **Accessibility**: Keyboard navigation, form submission
- **Browser Compatibility**: Cross-browser testing
- **Concurrency**: Multiple tab interactions

## 🛠 Technical Stack

- **Framework**: Playwright
- **Language**: TypeScript
- **Architecture**: Page Object Model
- **Test Data**: Faker.js
- **Reporting**: HTML, JSON, JUnit
- **CI/CD**: GitHub Actions ready

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

### Report Formats
- **HTML Report**: Interactive report with screenshots and videos
- **JSON Report**: Machine-readable results in `test-results/results.json`
- **JUnit Report**: CI/CD compatible XML format in `test-results/results.xml`

## 🔧 Configuration

### Environment Variables

Create a `.env` file for environment-specific configurations:

```env
BASE_URL=https://demo.prestashop.com/#/en/front
HEADLESS=true
TIMEOUT=30000
```

### Browser Configuration

Modify `playwright.config.ts` to customize:
- Browser selection
- Viewport sizes
- Test timeouts
- Retry logic
- Parallel execution

## 📝 Test Data Management

The project uses Faker.js for generating realistic test data:

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

### Error Handling
- Graceful failure handling
- Meaningful error messages
- Screenshot capture on failure

### Test Organization
- Logical test grouping
- Clear test descriptions
- Proper setup and teardown

## 🚨 Known Issues & Assumptions

### Assumptions Made
1. **Demo Site Stability**: Tests assume the PrestaShop demo site is accessible and functional
2. **Element Selectors**: Locators are based on current site structure and may need updates if the site changes
3. **Test Data**: Email addresses are generated with timestamp to avoid duplicates
4. **Network Conditions**: Tests assume stable internet connection

### Potential Issues
1. **Rate Limiting**: Demo site may have rate limiting that could affect test execution
2. **Dynamic Content**: Featured products may change, affecting product selection tests
3. **Session Management**: Demo site session handling may vary
4. **Captcha**: Some flows might introduce captcha which would require manual intervention

### Workarounds Implemented
- Dynamic wait strategies for loading states
- Retry mechanisms for flaky elements
- Fallback selectors for critical elements
- Error boundary handling for network issues

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

### Debug Tools
- Playwright Inspector for step-by-step debugging
- Screenshots and videos on failure
- Console logs in test output
- Network request tracking

## 📈 Continuous Integration

### GitHub Actions Example

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm ci
    - run: npx playwright install --with-deps
    - run: npm test
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Playwright documentation
3. Open an issue in the repository

---

**Note**: This automation suite is designed for the PrestaShop demo site. Adapt selectors and flows as needed for different PrestaShop installations.
