# shop

A modern and sophisticated e-commerce platform with an exceptional shopping experience. The platform offers a seamless, responsive design that adapts perfectly across all devices, providing customers with a smooth and engaging shopping journey from product discovery to checkout.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: SCSS Modules
- **State Management**: React Context API
- **E-commerce Backend**: [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- **Testing**: [Playwright](https://playwright.dev/) for E2E testing
- **Linting**: ESLint with Next.js configuration
- **Package Manager**: npm

## 🧪 Testing

The testing strategy leverages Playwright to run comprehensive end-to-end tests against the actual Next.js application running in a real browser environment. This approach ensures that all user interactions, component rendering, and application flows are tested as they would behave in production. To maintain test reliability and control, all server-to-server calls to external APIs are stubbed and mocked. This design allows for complete control over test scenarios without depending on external service availability or real data fluctuations.
