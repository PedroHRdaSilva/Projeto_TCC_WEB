const routes = {
  landing: "/",

  //public routes
  faq: "/#faq",
  prices: "/#prices",
  products: {
    financialsManagement: "/products/financials-management",
    wealthManagement: "/products/wealth-management",
    portfolio: "/products/portfolio",
    incomeTax: "/products/income-tax",
  },
  signup: "/singup",
  signin: "/signin",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  support: "/support",

  //private routes
  workspace: {
    dashboard: "/workspace/dashboard",
    transactions: "/workspace/transactions",
    portfolio: "/workspace/portfolio",
  },

  //api routes
  api: {
    logout: "/api/logout",
  },
};

export default routes;
