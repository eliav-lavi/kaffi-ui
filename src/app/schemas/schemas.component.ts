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

  schemas: PersistedSchema[] = [];

  constructor(public dialog: MatDialog, private schemaService: SchemaService) {
    schemaService.getAllSchemas().subscribe(schemas => this.schemas = schemas);
  }

  ngOnInit(): void {
  }

  addSchema() {
    const dialogRef = this.dialog.open(SchemaDialogComponent, { width: '700px', height: '500px', data: { type: SchemaDialogType.Add } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const schema = new Schema(result.subject, result.schema);
        this.schemaService.addSchema(schema).subscribe(schema => this.schemas.push(schema));
      };
    });
  }
}
