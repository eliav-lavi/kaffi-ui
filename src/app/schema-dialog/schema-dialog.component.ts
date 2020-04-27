import { Component, OnInit, Inject } from '@angular/core';
import { PersistedSchema } from '../models/schema';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export enum SchemaDialogType {
  Add,
  Edit
}

export interface DialogData {
  type: SchemaDialogType
  persistedSchema?: PersistedSchema;
}

@Component({
  selector: 'app-schema-dialog',
  templateUrl: './schema-dialog.component.html',
  styleUrls: ['./schema-dialog.component.scss']
})
export class SchemaDialogComponent implements OnInit {

  confirmCaption: string;
  title: string;

  constructor(
    public dialogRef: MatDialogRef<SchemaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  ngOnInit(): void {
    switch (this.data.type) {
      case SchemaDialogType.Edit:
        this.confirmCaption = "Update";
        this.title = "Update Existing Schema";
        break;
      case SchemaDialogType.Add:
        this.confirmCaption = "Create";
        this.title = "Add New Schema";
        break;
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
  
  create(): void {
    this.dialogRef.close(this.schemaForm.value);
  }

  schemaForm = new FormGroup({
    subject: new FormControl(this.data.persistedSchema?.subject || '', [Validators.required]),
    schema: new FormControl(this.data.persistedSchema?.schema || '', [Validators.required]),
  });

}
