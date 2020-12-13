export default class DatabaseError extends Error {
  status;

  constructor(message: string) {
    super(message);
    this.status = 500;
  }
}
