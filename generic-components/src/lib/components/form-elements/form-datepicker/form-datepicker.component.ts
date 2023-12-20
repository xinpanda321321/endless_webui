import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  HostBinding,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormsModule,
} from '@angular/forms';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { enGbLocale } from 'ngx-bootstrap/locale';
defineLocale('en-gb', enGbLocale);

import { Subscription, Subject } from 'rxjs';

import { BasicElementComponent } from '../basic-element/basic-element.component';

import { FormatString, isMobile, getTranslationKey } from '@webui/utilities';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import {
  API_DATE_FORMAT,
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  FULL_TIME_FORMAT,
  Time,
  TIME_FORMAT,
} from '@webui/time';
import { Moment } from '@webui/time';
// import { FormMode } from '../../../services';
import { Icon, IconSize, InfoComponent, TooltipDirective } from '@webui/ui';
import { NgForOf, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FaIconComponent, IconComponent, TimePickerComponent } from '@webui/ui';
import { DateFormatPipe } from '@webui/shared';
import { FormMode } from '@webui/models';
// import { InfoComponent } from '../../info/info.component';

enum DateType {
  Date = 'date',
  Datetime = 'datetime',
  Time = 'time',
}

@Component({
  standalone: true,
  selector: 'webui-form-datepicker',
  templateUrl: './form-datepicker.component.html',
  styleUrls: ['./form-datepicker.component.scss'],
  imports: [
    NgIf,
    TranslateModule,
    InfoComponent,
    FormsModule,
    TimePickerComponent,
    DateFormatPipe,
    FaIconComponent,
    BsDatepickerModule,
    IconComponent,
    NgForOf,
    TooltipDirective,
  ],
})
export class FormDatepickerComponent
  extends BasicElementComponent
  implements OnInit, OnDestroy
{
  @HostBinding('class.mobile-device') mobile = isMobile();

  public override config: any;
  public override group!: FormGroup;
  public override key: any;

  public errors: any;
  public message: any;

  public Icon = Icon;
  public IconSize = IconSize;

  public label!: boolean;
  public init!: boolean;
  public mobileDevice = isMobile();
  public displayValue!: string | null;
  public formData: any;
  public placement: any;
  public maxDate!: Date;

  public update: Subject<void> = new Subject();

  public timezone!: string;

  public dateFormat = DATE_FORMAT;
  public dateTimeFormat = DATE_TIME_FORMAT;
  public timeFormat = TIME_FORMAT;

  public viewMode!: boolean;
  public editMode = true;

  public date!: string;
  public time!: string;

  public currentField!: boolean;
  locale = 'en-gb';
  getTranslationKey = getTranslationKey;

  private subscriptions: Subscription[] = [];

  get formControl(): FormControl {
    return this.group.get(this.key) as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private localeService: BsLocaleService
  ) {
    super();
  }

  public ngOnInit() {
    this.timezone = this.config.time_zone;

    this.checkOnCustomDatepicker(this.config);
    this.addControl(this.config, this.fb, this.config.templateOptions.required);

    this.setInitValue();

    this.checkModeProperty();
    this.checkHiddenProperty();
    this.checkFormData();

    this.createEvent();

    this.subscriptions.push(this.subscribeOnChanges());

    const { type } = this.config.templateOptions;
    if (type === 'date' || type === 'datetime') {
      const isBirthday = this.key.includes('birthday');

      if (isBirthday) {
        setTimeout(() => {
          this.maxDate = new Date();
        });
      }
    }

    this.localeService.use(this.locale);
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe());
  }

  public onDateChange() {
    const { type } = this.config.templateOptions;

    this.updateForm(type, this.getValue(type));
  }

  public updateFromMobile(value?: string) {
    if (value) {
      this.time = value;
    }

    setTimeout(() => {
      const { type } = this.config.templateOptions;
      this.updateForm(type, this.getValue(type));
    }, 100);
  }

  public removeDate(date: string): void {
    if (this.config.many) {
      const prevValue = this.formControl.value;
      const newValue = prevValue.filter((item: any) => item !== date);

      this.formControl.patchValue(newValue.length ? newValue : null);
    }
  }

  private checkOnCustomDatepicker(config: any) {
    const { value, customDatepicker, time_zone } = config;

    if (customDatepicker) {
      const { dateFormat, parseFormat } = customDatepicker;
      this.dateFormat = dateFormat;

      if (value) {
        const dateInstance = Time.parse(value, {
          timezone: time_zone,
          format: parseFormat,
        });

        this.config.value = dateInstance.format(API_DATE_FORMAT);
      }
    }
  }

  private subscribeOnChanges(): Subscription {
    return (this.group.get(this.key) as FormControl).valueChanges.subscribe(
      val => {
        if (!val) {
          setTimeout(() => {
            this.event.emit({
              el: this.config,
              type: 'change',
            });
          }, 150);
        }
      }
    );
  }

  private checkHiddenProperty() {
    if (this.config && this.config.hidden) {
      const subscription = this.config.hidden.subscribe((hide: boolean) => {
        if (hide && !this.config.hide) {
          this.config.hide = hide;
          if (this.group.get(this.key)?.value) {
            this.group.get(this.key)?.patchValue(undefined);
          }
          this.setInitValue();
        } else {
          this.config.hide = hide;
        }

        if (!(<any>this.cd).destroyed) {
          this.cd.detectChanges();
        }
      });

      this.subscriptions.push(subscription);
    }
  }

  private checkModeProperty() {
    if (this.config && this.config.mode) {
      const subscription = this.config.mode.subscribe((mode: FormMode) => {
        if (mode === 'view') {
          this.viewMode = true;
          this.editMode = false;
          this.date = '';
          this.time = '';

          this.group.get(this.key)?.patchValue(undefined);
        } else {
          this.viewMode = this.config.read_only || false;
          this.editMode = true;
        }
        this.setInitValue();
      });

      this.subscriptions.push(subscription);
    }
  }

  private checkFormData() {
    if (this.config.formData) {
      const subscription = this.config.formData.subscribe((data: any) => {
        if (
          data.key !== this.config.key &&
          this.config.default &&
          this.config.default.includes('{') &&
          !this.config.isPrefilled &&
          this.inDefaultValue(data.key)
        ) {
          this.formData = data.data;
          this.setInitValue();
        }
      });

      this.subscriptions.push(subscription);
    }
  }

  private updateModel(value: Moment) {
    if (this.mobileDevice) {
      this.date = value.format(API_DATE_FORMAT);
      this.time = value.format(TIME_FORMAT);
    } else {
      this.date = value.format(this.dateFormat);
      this.time = value.format(this.timeFormat);
    }
  }

  private parseValue(type: DateType, value: string): Moment {
    switch (type) {
      case DateType.Date: {
        return Time.parse(value, {
          timezone: this.timezone,
          format: API_DATE_FORMAT,
        });
      }

      case DateType.Datetime: {
        return Time.parse(value, { timezone: this.timezone });
      }

      case DateType.Time: {
        return Time.parse(value, {
          timezone: this.timezone,
          format: FULL_TIME_FORMAT,
        });
      }
    }
  }

  private setDisplayValue(type: DateType, value?: Moment | null) {
    if (!value) {
      this.displayValue = null;
      return;
    }

    switch (type) {
      case DateType.Date: {
        this.displayValue = value.format(this.dateFormat);
        break;
      }

      case DateType.Datetime: {
        this.displayValue = value.format(this.dateTimeFormat);
        break;
      }

      case DateType.Time: {
        this.displayValue = value.format(this.timeFormat);
        break;
      }
    }
  }

  private clearForm() {
    this.date = '';
    this.time = '';
    this.group.get(this.key)?.patchValue(null);
  }

  private setInitValue() {
    const { shouldUpdate, updateFromForm } = this.config;
    const { type } = this.config.templateOptions;
    const initValue = this.config.value;
    const formValue = this.group.get(this.key)?.value;
    const defaultValue = this.config.default;

    let value = updateFromForm
      ? formValue || initValue
      : initValue || formValue;

    if ((!value && defaultValue && defaultValue !== '-') || shouldUpdate) {
      value = this.config.default.includes('{')
        ? FormatString.format(defaultValue, this.formData)
        : defaultValue;
    }

    if (value === this.group.get(this.key)?.value && !shouldUpdate) {
      return;
    }

    if (value) {
      const dateInstance = this.parseValue(type, value);
      this.updateModel(dateInstance);
      this.setDisplayValue(type, dateInstance);
      this.updateForm(type, dateInstance);
    } else if (shouldUpdate) {
      this.clearForm();
      this.setDisplayValue(type, null);
    }
  }

  private updateForm(type: DateType, value?: Moment): void {
    let data: string | null;

    switch (type) {
      case DateType.Date: {
        data = value ? value.format(API_DATE_FORMAT) : null;
        break;
      }

      case DateType.Datetime: {
        data = value ? value.utc().format() : null;

        if (!this.time && data) {
          this.time = '00:00';
        } else if (!data) {
          this.time = '';
        }
        break;
      }

      case DateType.Time: {
        data = value ? value.format(TIME_FORMAT) : null;
        break;
      }
    }

    if (this.config.many) {
      const prevValue = this.formControl.value || [];

      this.date = '';
      this.time = '';

      this.formControl.patchValue([...prevValue, data]);
    } else {
      this.group.get(this.key)?.patchValue(data);
    }

    this.emitChanges();
  }

  private getValue(type: DateType): Moment | undefined {
    if (this.mobileDevice) {
      return this.parseValues(
        type,
        { value: this.date, format: API_DATE_FORMAT },
        { value: this.time, format: this.timeFormat }
      );
    }

    const date = this.date
      ? typeof this.date === 'string'
        ? Time.parse(this.date, { format: this.dateFormat }).format(
            this.dateFormat
          )
        : Time.parse(this.date).format(this.dateFormat)
      : '';

    return this.parseValues(
      type,
      { value: date, format: this.dateFormat },
      { value: this.time, format: this.timeFormat }
    );
  }

  private parseValues(
    type: DateType,
    date: { value: string; format: string },
    time: { value: string; format: string }
  ): Moment | undefined {
    let result: Moment | undefined;

    switch (type) {
      case DateType.Date: {
        result = date.value
          ? Time.parse(date.value, {
              timezone: this.timezone,
              format: date.format,
            })
          : undefined;
        break;
      }

      case DateType.Datetime: {
        if (!date.value) {
          result = undefined;
        } else if (!time.value) {
          result = Time.parse(date.value, {
            timezone: this.timezone,
            format: date.format,
          });
        } else {
          result = Time.parse(`${date.value} ${time.value}`, {
            timezone: this.timezone,
            format: `${date.format} ${time.format}`,
          });
        }
        break;
      }

      case DateType.Time: {
        result = time.value
          ? Time.parse(time.value, {
              timezone: this.timezone,
              format: time.format,
            })
          : undefined;
        break;
      }
    }

    return result;
  }

  private emitChanges() {
    this.event.emit({
      el: this.config,
      type: 'change',
      value: this.group.get(this.key)?.value,
    });
  }
}
