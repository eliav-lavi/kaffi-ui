export class Schema {
  subject: string;
  schema: string;

  constructor(subject: string, schema: string) {
    this.subject = subject;
    this.schema = schema;
  }
}

export class PersistedSchema extends Schema {
  id: string;

  constructor(id: string, subject: string, schema: string) {
    super(subject, schema);
    this.id = id;
  }

  static fromObject(obj: any): PersistedSchema {
    return new PersistedSchema(obj.id, obj.subject, obj.schema);
  }
}