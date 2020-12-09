export default {
  API_BASE_URL:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000/api',
  TRANSACTION_API: '/transactions',
  PAYMENT_METHOD_API: '/payment-methods',
  CATEGORY_API: '/categories',
  FIXED_EXPENDITURE_API: '/fixed-expenditure',
  AUTH_API: '/auth',
  GET_OVERSPENDING_INDEX_API: '/aggregate/overspending-index',
  GET_MOST_SPEND_CATEGORY_API: '/aggregate/max-category',
};
