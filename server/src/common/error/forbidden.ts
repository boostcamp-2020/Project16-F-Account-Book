export default class ForbiddenError extends Error {
  status;

  constructor(message: string) {
    super(message);
    this.status = 403;
  }
}
