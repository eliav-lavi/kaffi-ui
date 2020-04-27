export class Message {
  topic: string;
  schemaId: number;
  key: string;
  value: string;

  constructor(topic: string, schemaId: number, key: string, value: string) {
    this.topic = topic;
    this.schemaId = schemaId;
    this.key = key;
    this.value = value;
  }

  static fromObject(obj: any): Message {
    return new Message(obj.topic, obj.schemaId, obj.key, obj.value);
  }
}