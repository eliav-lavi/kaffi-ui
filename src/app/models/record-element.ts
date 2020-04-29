export class RecordElement {
  type: string;
  payload: string;
  schemaId?: string;

  constructor(type: string, payload: string, schemaId?: string) {
    this.type = type;
    this.payload = payload;
    this.schemaId = schemaId;
  }

  static fromObject(obj: any): RecordElement {
    return new RecordElement(obj.type, obj.payload, obj.schemaId);
  }
}