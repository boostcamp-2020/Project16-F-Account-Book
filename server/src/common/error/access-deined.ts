export default class AccessDeniedError extends Error {
  status;

  constructor(message: string) {
    super(message);
    this.status = 401;
  }
}
