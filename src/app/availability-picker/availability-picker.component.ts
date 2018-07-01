import { Component, ChangeDetectionStrategy,
  OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';

@Component({
  selector: 'app-availability-picker',
  templateUrl: './availability-picker.component.html',
  styleUrls: ['./availability-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AvailabilityPickerComponent implements OnInit {
  viewDate: Date = new Date();
  viewDates: CalendarMonthViewDay[] = [];
  selectedDate: CalendarMonthViewDay;
  view = 'month';

  constructor() {
  }

  ngOnInit() {}

  dayClicked(day: CalendarMonthViewDay): void {
    const index =  this.viewDates.indexOf(day);
    if (index !== -1) {
       this.viewDates.splice(index, 1);
       delete day.cssClass;
    } else {
      const newDay: CalendarMonthViewDay = day;
      this.viewDates.push(newDay);
      newDay.cssClass = 'cal-day-selected';
    }
  }

  beforeMonthViewRender2({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if ( this.viewDates &&
           this.viewDates.indexOf(day) !== -1) {
        day.cssClass = 'cal-day-selected';
        this.selectedDate = day;
      }
    });
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (
        this.selectedDate &&
        day.date.getTime() === this.selectedDate.date.getTime()
      ) {
        day.cssClass = 'cal-day-selected';
        this.selectedDate = day;
      }
    });
  }
}
