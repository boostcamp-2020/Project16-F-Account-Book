export default class ServerError extends Error {
  status;

  constructor(message: string) {
    super(message);
    this.status = 500;
  }
}
