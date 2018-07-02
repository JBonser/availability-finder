import { Component, ChangeDetectionStrategy,
  OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';

@Component({
  selector: 'app-availability-picker',
  templateUrl: './availability-picker.component.html',
  styleUrls: ['./availability-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailabilityPickerComponent implements OnInit {
  viewDate: Date = new Date();
  viewDates: Date[] = [];
  selectedDate: CalendarMonthViewDay;
  view = 'month';

  constructor() {
  }

  ngOnInit() {}

  dayClicked(day: CalendarMonthViewDay): void {
    const index =  this.viewDates.indexOf(day.date);
    if (index !== -1) {
       this.viewDates.splice(index, 1);
       delete day.cssClass;
    } else {
      const newDay: CalendarMonthViewDay = day;
      this.viewDates.push(day.date);
      newDay.cssClass = 'cal-day-selected';
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    console.log(this.viewDates)
    body.forEach(day => {
      if (this.viewDates) {
        this.viewDates.forEach(viewDate => {
          // Comparison only work with getTime as that uses milliseconds
          if (viewDate.getTime() === day.date.getTime()) {
          day.cssClass = 'cal-day-selected';
          this.selectedDate = day;
        }
      });
    }
  }
}
