const BAD_REQUEST = JSON.stringify({
  status: 400,
  body: 'Bad request',
});

const ACCESS_DENIED = JSON.stringify({
  status: 401,
  body: 'Unauthorized',
});

const DATABASE_ERROR = JSON.stringify({
  status: 500,
  body: 'Internal server error',
});

export { BAD_REQUEST, ACCESS_DENIED, DATABASE_ERROR };
