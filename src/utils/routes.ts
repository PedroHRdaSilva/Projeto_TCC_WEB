const routes = {
  landing: "/",

  //public routes

  signup: "/signup",
  signin: "/signin",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  support: "/support",

  //private routes
  finance: {
    dashboard: "/finance/dashboard",
    transactions: "/finance/transaction",
  },

  //api routes
  api: {
    logout: "/api/logout",
  },
};

export default routes;
