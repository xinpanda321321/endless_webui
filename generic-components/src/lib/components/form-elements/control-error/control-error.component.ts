import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'webui-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule],
})
export class ControlErrorComponent {
  @Input() control?: AbstractControl;

  readonly keys = [
    {
      key: 'min',
      message: 'error.minimum-value',
      values: () => ({
        value: this.control?.getError('min').min,
      }),
    },
    {
      key: 'max',
      message: 'error.maximum-value',
      values: () => ({
        value: this.control?.getError('max').max,
      }),
    },
  ];
}
