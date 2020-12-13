export default class UnauthorizedError extends Error {
  status;

  constructor(message: string) {
    super(message);
    this.status = 401;
  }
}
