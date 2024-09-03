import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css',
})
export class MeetingComponent implements OnInit {
  sectionSelect: 'basic' | 'config' = 'config'

  section = {
    basic: {
      complect: false,
      disable: false,
      view: true,
    },
    config: {
      complect: false,
      disable: false,
      view: false
    }
  }
  ngOnInit(): void { }

  nextSection() {
    switch(this.sectionSelect) {
      case 'basic':
        this.sectionSelect = 'config'
        break;
      case 'config':
        this.sectionSelect
        break;
    }
  }

  afterSection(){
    switch(this.sectionSelect) {
      case 'config':
        this.sectionSelect = 'basic'
        break;
    }
  }
}
