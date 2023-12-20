import {
  ConnectedPosition,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Attribute,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
} from '@angular/core';
import { TooltipComponent } from '../components';

type TooltipPosition =
  | 'right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'left-top'
  | 'right-top';

@Directive({
  selector: '[webuiTooltip]',
  standalone: true,
  exportAs: '[webuiTooltip]',
})
export class TooltipDirective implements OnDestroy {
  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  private overlayRef?: OverlayRef;
  private readonly hasCloseButton: boolean;
  private readonly darkTheme: boolean;

  @Input() webuiTooltip?: unknown;
  @Input() trigger: 'mouseover' | 'click' | 'manual' = 'mouseover';
  @Input() placement: TooltipPosition = 'right';
  @Input() tooltipClass?: string;

  @Output() shown = new EventEmitter<void>();
  @Output() hidden = new EventEmitter<void>();

  constructor(
    @Attribute('hasCloseButton') hasCloseButton: boolean,
    @Attribute('darkTheme') darkTheme: boolean
  ) {
    this.hasCloseButton = hasCloseButton !== null;
    this.darkTheme = darkTheme !== null;
  }

  ngOnDestroy(): void {
    this.detach();
  }

  public show() {
    if (!this.overlayRef) {
      this.attach();
    }
  }

  public hide() {
    if (this.overlayRef) {
      this.detach();
    }
  }

  private attach() {
    if (!this.webuiTooltip) {
      return;
    }

    this.overlayRef = this.overlay.create(this.getConfig());
    const tooltipPortal = new ComponentPortal(TooltipComponent);
    const compRef = this.overlayRef.attach(tooltipPortal);

    if (typeof this.webuiTooltip === 'string') {
      compRef.instance['message'] = this.webuiTooltip;
    }

    if (this.webuiTooltip instanceof TemplateRef) {
      compRef.instance['templateRef'] = this.webuiTooltip;
    }

    if (this.hasCloseButton) {
      compRef.instance['onClose'] = () => this.detach();
    }

    if (this.darkTheme) {
      compRef.instance['dark'] = true;
    }

    this.shown.emit();
  }

  private detach() {
    this.hidden.emit();
    this.overlayRef?.detach();
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
  }

  @HostListener('mouseover')
  onMouseOver() {
    if (!this.overlayRef && this.trigger === 'mouseover') {
      this.attach();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.overlayRef && this.trigger === 'mouseover') {
      this.detach();
    }
  }

  @HostListener('click')
  onClick() {
    if (this.trigger === 'click') {
      this.overlayRef ? this.detach() : this.attach();
    }
  }

  private getConfig() {
    return new OverlayConfig({
      disposeOnNavigation: true,
      width: 'fit-content',
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withGrowAfterOpen(true)
        .withPositions(this.getPosition(this.placement)),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
  }

  private getPosition(placement: TooltipPosition): ConnectedPosition[] {
    switch (placement) {
      case 'bottom': {
        return [
          {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
            offsetY: 8,
          },
        ];
      }

      case 'bottom-left':
        return [
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 8,
          },
        ];

      case 'bottom-right':
        return [
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
            offsetY: 8,
          },
        ];

      case 'right':
      case 'right-top':
        return [
          {
            originX: 'end',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top',
            offsetX: 8,
          },
        ];

      case 'left-top':
        return [
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'top',
            offsetX: -8,
          },
        ];

      default:
        return [
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
        ];
    }
  }
}
