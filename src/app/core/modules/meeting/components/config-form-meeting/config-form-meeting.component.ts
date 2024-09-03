import { state } from '@angular/animations';
import { Component, inject, output, type OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService, MeetingService } from '@services';

@Component({
  selector: 'app-config-form-meeting',
  templateUrl: './config-form-meeting.component.html',
  styleUrl: './config-form-meeting.component.css',
})
export class ConfigFormMeetingComponent implements OnInit {
  public next = output<void>();
  public after = output<void>();
  public form: FormGroup;

  private _eventService = inject(EventService)

  constructor() {
    this.form = new FormGroup({
      login_with_credentials: new FormControl(1, Validators.required),
      upload_database: new FormControl(''),
      file: new FormControl(''),
    });
  }
  
  ngOnInit(): void { 
    this._eventService.getEventTypes().subscribe({
      next:(data)=>{
        console.log(data)
      }
    })
  }

}
