import { Component, ChangeDetectionStrategy,
  OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { AvailableDatesService } from '../services/available-date.service';
import { Observable, Subject, interval } from 'rxjs';
import { delay, takeWhile } from 'rxjs/operators';
import { UserDate } from '../models/user-date';


@Component({
  selector: 'app-availability-picker',
  templateUrl: './availability-picker.component.html',
  styleUrls: ['./availability-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AvailabilityPickerComponent implements OnInit, OnDestroy {
  refresh: Subject<any> = new Subject();
  viewDate: Date = new Date();
  viewDates: UserDate[];
  selectedDate: CalendarMonthViewDay;
  view = 'month';
  alive = true;

  constructor(private datesService: AvailableDatesService) {
  }

  ngOnInit() {
    this.getDatesForUser(1);
    this.refresh.next();
  }

  ngOnDestroy() {
    this.alive = false; // switches your IntervalObservable of
  }

  getDatesForUser(id: number): void {
    this.datesService.getDatesForUser(id).pipe(takeWhile(() => this.alive)).subscribe(this.refresh.asObservable);
    this.datesService.getDatesForUser(id).pipe(takeWhile(() => this.alive)).subscribe(dates => { this.viewDates = dates; });
  }

  dayClicked(day: CalendarMonthViewDay): void {
    const index = this.viewDates.findIndex( userDate => userDate.date === day.date );
    if (index !== -1) {
      this.datesService.removeDateById(this.viewDates[index].id)
      .subscribe(subDay => {
        this.viewDates.splice(index, 1);
      });
      delete day.cssClass;
    } else {
      const newDay: CalendarMonthViewDay = day;
      this.datesService.addDateForUser(1, new UserDate(7, 1, day.date))
      .subscribe(subDay => {
        this.viewDates.push(subDay);
      });
      newDay.cssClass = 'cal-day-selected';
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    console.log(this.viewDates);
    body.forEach(day => {
      if (this.viewDates) {
          this.viewDates.forEach(viewDate => {
          // Comparison only work with getTime as that uses milliseconds
          if (viewDate.date.getTime() === day.date.getTime()) {
          day.cssClass = 'cal-day-selected';
          this.selectedDate = day;
          }
        });
      }
    });
  }
}
