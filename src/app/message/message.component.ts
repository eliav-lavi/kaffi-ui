import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from '../message.service';
import { Record } from '../models/record';
import { SchemaService } from '../schema.service';
import { PersistedSchema } from '../models/schema';
import { RecordElement } from '../models/record-element';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  schemas: PersistedSchema[] = [];

  constructor(private messageService: MessageService, schemaService: SchemaService) { 
    schemaService.getAllSchemas().subscribe(schemas => this.schemas = schemas);
  }

  ngOnInit(): void {
  }

  messageForm = new FormGroup({
    topic: new FormControl('', [Validators.required]),
    
    keySerializer: new FormControl('',[Validators.required]),
    keySchemaId: new FormControl(''),
    keyPayload: new FormControl('', [Validators.required]),
    
    valueSerializer: new FormControl('',[Validators.required]),
    valueSchemaId: new FormControl(''),
    valuePayload: new FormControl('', [Validators.required]),
  });

  produce() {
    const topic = this.messageForm.value.topic;
    const keySerializer = this.messageForm.value.keySerializer;
    const keySchemaId = this.messageForm.value.keySchemaId;
    const keyPayload = this.messageForm.value.keyPayload;
    const valueSerializer = this.messageForm.value.valueSerializer;
    const valueSchemaId = this.messageForm.value.valueSchemaId;
    const valuePayload = this.messageForm.value.valuePayload;

    const key = new RecordElement(keySerializer,keyPayload, keySchemaId)
    const value = new RecordElement(valueSerializer,valuePayload, valueSchemaId)
  
    const message = new Record(topic, key, value);

    this.messageService.produce(message).subscribe(res => console.log(res))
  }
}
