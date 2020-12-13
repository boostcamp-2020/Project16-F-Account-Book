export default class ForbideenError extends Error {
  status;

  constructor(message: string) {
    super(message);
    this.status = 403;
  }
}
