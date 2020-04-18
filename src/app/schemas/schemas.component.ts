import { Component, OnInit } from '@angular/core';
import { Schema, PersistedSchema } from '../models/schema';
import { SchemaService } from '../schema.service';
import { MatDialog } from '@angular/material/dialog';
import { SchemaDialogComponent, SchemaDialogType } from '../schema-dialog/schema-dialog.component';

@Component({
  selector: 'app-schemas',
  templateUrl: './schemas.component.html',
  styleUrls: ['./schemas.component.scss']
})
export class SchemasComponent implements OnInit {

  schemas: PersistedSchema[] = [new PersistedSchema("a1", "test", "hello")];

  constructor(public dialog: MatDialog, private schemaService: SchemaService) {
    schemaService.getAllSchemas().subscribe(schemas => this.schemas = schemas);
  }

  ngOnInit(): void {
  }

  addSchema() {
    const dialogRef = this.dialog.open(SchemaDialogComponent, { data: { type: SchemaDialogType.Add } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const schema = new Schema(result.name, result.content);
        this.schemaService.addSchema(schema).subscribe(schema => this.schemas.push(schema));
      };
    });
  }

  removeSchema(id: string) {
    this.schemaService.removeSchema(id)
      .subscribe(removedSchema => this.schemas = this.schemas.filter(s => s.id != removedSchema.id));
  }
}
