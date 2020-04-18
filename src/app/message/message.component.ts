import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from '../message.service';
import { Message } from '../models/message';
import { SchemaService } from '../schema.service';
import { PersistedSchema } from '../models/schema';

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
    schema: new FormControl('', [Validators.required]),
    topic: new FormControl('', [Validators.required]),
    key: new FormControl('', [Validators.required]),
    payload: new FormControl('', [Validators.required])
  });

  produce() {
    const payload = this.messageForm.value.payload;
    const schemaName = this.messageForm.value.schema;
    const topic = this.messageForm.value.topic;
    const key = this.messageForm.value.key;
    const message = new Message(payload, schemaName, topic, key);

    this.messageService.produce(message).subscribe(res => console.log(res))
  }
}
