export class Schema {
  name: string;
  content: string;

  constructor(name: string, content: string) {
    this.name = name;
    this.content = content;
  }
}

export class PersistedSchema extends Schema {
  id: string;

  constructor(id: string, name: string, content: string) {
    super(name, content);
    this.id = id;
  }

  static fromObject(obj: any): PersistedSchema {
    return new PersistedSchema(obj.id, obj.name, obj.content);
  }
}