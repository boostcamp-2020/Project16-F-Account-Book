export default class BadRequest extends Error {
  status;

  constructor(message: string) {
    super(message);
    this.status = 400;
  }
}
