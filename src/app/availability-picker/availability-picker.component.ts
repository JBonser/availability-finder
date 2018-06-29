import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'app-availability-picker',
  templateUrl: './availability-picker.component.html',
  styleUrls: ['./availability-picker.component.css']
})
export class AvailabilityPickerComponent implements OnInit {
  viewDate: Date = new Date();
  constructor() { }

  ngOnInit() {
  }
}
