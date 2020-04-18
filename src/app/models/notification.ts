export class Notification {
  time: Date;
  level: string;
  message: string;

  constructor(time: Date, level: string, message: string) {
    this.time = time;
    this.level = level;
    this.message = message;
  }
}