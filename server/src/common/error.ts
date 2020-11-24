const ACCESS_DENIED = JSON.stringify({
  status: 401,
  body: 'Unauthorized',
});

const DATABASE_ERROR = {
  status: 500,
  body: 'Internal server error',
};

export { ACCESS_DENIED, DATABASE_ERROR };
