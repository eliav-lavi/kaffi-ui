import { RecordElement } from './record-element';

export class Record {
  topic: string;
  key: RecordElement;
  value: RecordElement;

  constructor(topic: string, key: RecordElement, value: RecordElement) {
    this.topic = topic;
    this.key = key;
    this.value = value;
  }

  static fromObject(obj: any): Record {
    const key = RecordElement.fromObject(obj.key);
    const value = RecordElement.fromObject(obj.value);
    return new Record(obj.topic, key, value);
  }
}