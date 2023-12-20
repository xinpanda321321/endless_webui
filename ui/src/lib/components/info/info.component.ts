import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { TooltipDirective } from '../../directives';

@Component({
  standalone: true,
  selector: 'webui-info',
  template: `
    <i
      [webuiTooltip]="description"
      class="info"
      [class.danger]="danger"
      [trigger]="triggersType"
      [placement]="placement || 'right'"
      *ngIf="description">
      {{ text || 'i' }}
    </i>
  `,
  styleUrls: ['./info.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [NgIf, TooltipDirective],
})
export class InfoComponent implements OnInit {
  @Input() public description!: string | TemplateRef<any>;
  @Input() public text!: string;
  @Input() public placement!:
    | 'right'
    | 'bottom'
    | 'left'
    | 'left-top'
    | 'right-top';
  @Input() public triggersType: 'mouseover' | 'click' | 'manual' = 'mouseover';
  @Input() public danger!: boolean;

  public config: any;

  public ngOnInit() {
    if (this.config && this.config.description) {
      this.description = this.config.description;
    }
  }
}
