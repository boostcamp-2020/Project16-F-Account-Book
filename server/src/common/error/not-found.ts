export default class NotFoundError extends Error {
  status;

  constructor(message: string) {
    super(message);
    this.status = 404;
  }
}
