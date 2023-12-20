import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { DateRange, filterDateFormat, Moment } from '@webui/time';
import { DatepickerRangeService, DatepickerService } from '@webui/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SafeHtmlPipe } from '@webui/shared';
import { DateRangeComponent } from '../date-range/date-range.component';
import { TooltipDirective } from '../../directives';

export interface IDateRange {
  start: Moment;
  end: Moment;
  monthStart?: Moment;
  monthEnd?: Moment;
}

@Component({
  standalone: true,
  selector: 'webui-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DateRangeComponent,
    TranslateModule,
    SafeHtmlPipe,
    TooltipDirective,
  ],
})
export class DatepickerComponent implements OnInit {
  @Input() type!: DateRange;
  @Input() date!: Moment;
  @Input() range?: IDateRange;

  @Output() update = new EventEmitter();
  @Output() closed = new EventEmitter<void>();

  dateRange = DateRange;
  showCustomWeek = false;

  rangeTitle!: string;
  yearBody: any;
  monthBody: any;
  activeDates!: string[];

  get isYearRange() {
    return this.dateRangeService.isYearRange(this.type);
  }

  get isWeekRange() {
    return this.dateRangeService.isWeekRange(this.type);
  }

  get isDayRange() {
    return this.dateRangeService.isDayRange(this.type);
  }

  constructor(
    private dateRangeService: DatepickerRangeService,
    private datepickerService: DatepickerService,
    private elementRef: ElementRef
  ) {}

  public ngOnInit() {
    this.fillCalendar(this.date);

    this.setActiveDates(this.date, this.range);
  }

  public setActiveDates(from: Moment, range?: IDateRange) {
    range = range || this.datepickerService.getRangeDates(from, DateRange.Week);
    this.activeDates = [];
    const day = range.start.clone();

    while (day.isBefore(range.end)) {
      this.activeDates.push(day.format(filterDateFormat));
      day.add(1, DateRange.Day);
    }
  }

  public fillCalendar(date: Moment) {
    switch (this.type) {
      case DateRange.Year:
        this.generateYearCalendar(date);
        break;

      case DateRange.Week:
        this.generateMonthCalendar(date);
        break;

      case DateRange.Day:
        this.generateMonthCalendar(date);
        break;
    }
  }

  public changeCalendar(date: Moment) {
    this.fillCalendar(date);
  }

  public changeDate(date: Moment) {
    this.update.emit(date);
  }

  public isActiveDay(day: any) {
    return this.activeDates.indexOf(day.date) > -1;
  }

  public isFirstActiveDay(day: any) {
    return this.activeDates.indexOf(day.date) === 0;
  }

  public isLastActiveDay(day: any) {
    return this.activeDates.indexOf(day.date) === this.activeDates.length - 1;
  }

  public showCustomWeekCalendar(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.showCustomWeek = true;
  }

  public setCustomWeek(date: Moment) {
    this.update.emit({
      start: date.clone(),
      end: date.clone().add(1, DateRange.Week),
    });
  }

  private generateYearCalendar(date: Moment) {
    this.yearBody = this.datepickerService.generateYear(date, body => {
      return body.map(row => {
        return row.map(month => {
          return {
            ...month,
            active: month.month === date.month(),
          };
        });
      });
    });
  }

  private generateMonthCalendar(date: Moment) {
    this.monthBody = this.datepickerService.generateMonth(date, body => {
      return body.map(week => {
        return week.map(day => {
          return {
            ...day,
            currentMonth: day.month === date.month(),
          };
        });
      });
    });
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  public handleClick(event: MouseEvent) {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = (clickedComponent as HTMLElement).parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.closed.emit();
    }
  }
}
