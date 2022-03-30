/* eslint-disable  no-console */
class Log {
  public linePrefix: string;

  public today = new Date();

  constructor() {
    const dateString = `${this.today.getFullYear()}-${(this.today.getMonth() + 1)}-${this.today.getDate()}`;
    const timeString = `${this.today.getHours()}:${this.today.getMinutes()}:${this.today.getSeconds()}`;
    this.linePrefix = `[${dateString} ${timeString}`;
  }

  public info = (msg: string): void => console.log(`[${this.linePrefix}] ${msg}`);

  public warn = (msg: string): void => console.warn(`[${this.linePrefix}] ${msg}`);

  public error = (msg: string): void => console.error(`[${this.linePrefix}] ${msg}`);
}

export default new Log();
