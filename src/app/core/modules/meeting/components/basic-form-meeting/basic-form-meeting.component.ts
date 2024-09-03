import { Component, inject, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MeetingService } from '@services';

@Component({
  selector: 'app-basic-form-meeting',
  templateUrl: './basic-form-meeting.component.html',
  styleUrl: './basic-form-meeting.component.css',
})
export class BasicFormMeetingComponent implements OnInit {
  public form: FormGroup;
  public next = output<void>();
  constructor() {
    this.form = new FormGroup({
      residential_id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      state: new FormControl('active', Validators.required),
      meeting_time: new FormControl('', Validators.required),
      email_template_id: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {}


}
