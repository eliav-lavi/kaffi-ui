export class Message {
  payload: string;
  schemaName: string;
  topic: string;
  key: string;

  constructor(payload: string, schemaName: string, topic: string, key: string) {
    this.payload = payload;
    this.schemaName = schemaName;
    this.topic = topic;
    this.key = key;
  }

  static fromObject(obj: any): Message {
    return new Message(obj.payload, obj.schemaName, obj.topic, obj.key);
  }
}