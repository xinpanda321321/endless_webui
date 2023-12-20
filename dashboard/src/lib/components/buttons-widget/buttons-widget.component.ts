import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { EventService, EventType, CompanyPurposeService } from '@webui/core';

import { WidgetService } from '../../services/widget.service';
import { ButtonWidget } from '@webui/data';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SubscriptionRequiredDirective } from '@webui/shared';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '@webui/ui';

@Component({
  standalone: true,
  selector: 'webui-buttons-widget',
  templateUrl: './buttons-widget.component.html',
  styleUrls: ['./buttons-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    SubscriptionRequiredDirective,
    RouterLink,
    LoaderComponent,
  ],
})
export class ButtonsWidgetComponent implements OnInit, OnDestroy {
  buttons?: ButtonWidget[];

  private eventSubscription!: Subscription;

  constructor(
    private widgetService: WidgetService,
    private eventService: EventService,
    private purposeService: CompanyPurposeService
  ) {}

  ngOnInit() {
    this.buttons = this.purposeService.filterModules(
      this.widgetService.getButtons()
    );
    this.eventSubscription = this.eventService.event$.subscribe(
      (type: EventType) => {
        if (type === EventType.PurposeChanged) {
          this.buttons = this.purposeService.filterModules(this.buttons);
        }
      }
    );
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

  getLinkToList(button: { link: string }): string {
    return `/mn${button.link}`;
  }

  getLinkToCreateForm(button: { link: string }): string {
    return `/mn${button.link}add`;
  }

  getTranslateKey(key: string, type: 'label' | 'description' | 'add'): string {
    return [key, type].join('.');
  }
}
