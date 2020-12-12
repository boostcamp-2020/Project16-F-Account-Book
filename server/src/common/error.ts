const BAD_REQUEST = {
  status: 400,
  message: 'Bad request',
};

const ACCESS_DENIED = {
  status: 401,
  message: 'Unauthorized',
};

const FORBIDDEN = {
  stats: 403,
  message: 'Does not havee access rights',
};

const DATABASE_ERROR = {
  status: 500,
  message: 'Internal server error',
};

const NOT_FOUND_ERROR = {
  status: 404,
  message: 'cannot find requested resource',
};

export { BAD_REQUEST, ACCESS_DENIED, DATABASE_ERROR, NOT_FOUND_ERROR, FORBIDDEN };
