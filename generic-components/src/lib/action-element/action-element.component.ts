import {
  Component,
  Input,
  ViewChild,
  EventEmitter,
  Output,
  OnChanges,
  ChangeDetectionStrategy,
  TemplateRef,
} from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SiteSettingsService } from '@webui/core';
import { FormatString } from '@webui/utilities';
import { CommonModule } from '@angular/common';
import { SubscriptionRequiredDirective } from '@webui/shared';
import { TranslateModule } from '@ngx-translate/core';
import { CloseButtonComponent, SpinnerComponent } from '@webui/ui';
import { FormsModule } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { dialogConfig, DialogRef } from '@webui/models';

@Component({
  standalone: true,
  selector: 'webui-action-element',
  templateUrl: 'action-element.component.html',
  styleUrls: ['./action-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SubscriptionRequiredDirective,
    TranslateModule,
    SpinnerComponent,
    CloseButtonComponent,
    FormsModule,
  ],
})
export class ActionElementComponent implements OnChanges {
  @Input() public config: any;
  @Input() public count!: number;
  @Input() public actionProcess!: boolean;
  @ViewChild('content') public content!: TemplateRef<unknown>;

  public closeResult!: string;
  public data: any;
  public label!: string;
  public modalRef!: DialogRef;

  @Output() public event: EventEmitter<any> = new EventEmitter();

  public action: any = {};

  public constructor(
    private modalService: Dialog,
    private siteSettings: SiteSettingsService
  ) {}

  public ngOnChanges() {
    this.data = {
      count: this.count,
    };
    const format = new FormatString();
    this.label = format.format(this.config.button_label, this.data);
  }

  public toDoAction() {
    if (this.action && this.action.confirm) {
      this.open(this.content);
    } else if (this.action && !this.action.confirm) {
      this.event.emit({
        action: this.action,
      });
    }
  }

  public open(content: any) {
    this.modalService.open(content, dialogConfig()).closed.subscribe(result => {
      if (result) {
        this.event.emit({
          action: this.action,
        });
        this.action = '';
      }
    });
  }

  public getSmsTitle(endpoint: string): string {
    return this.isDisableSmsButton(endpoint)
      ? this.siteSettings.smsActionDisabledMessage()
      : '';
  }

  public isDisableSmsButton(endpoint = ''): boolean {
    if (endpoint.indexOf('sendsms') !== -1) {
      return !this.siteSettings.isSmsEnabled();
    }

    return false;
  }
}
