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
    schemaId: new FormControl('', [Validators.required]),
    topic: new FormControl('', [Validators.required]),
    key: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required])
  });

  produce() {
    const value = this.messageForm.value.value;
    const schemaId = this.messageForm.value.schemaId;
    const topic = this.messageForm.value.topic;
    const key = this.messageForm.value.key;
    const message = new Message(topic, schemaId, key, value);

    this.messageService.produce(message).subscribe(res => console.log(res))
  }
}
