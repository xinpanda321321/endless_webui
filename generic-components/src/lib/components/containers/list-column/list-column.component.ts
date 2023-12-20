import { Component, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListElementDirective } from '../../../directives';
// import { ListElementDirective } from '../../directives';

@Component({
  standalone: true,
  selector: 'webui-list-column',
  templateUrl: 'list-column.component.html',
  imports: [CommonModule, forwardRef(() => ListElementDirective)],
})
export class ListColumnComponent {
  @Output()
  public event: EventEmitter<any> = new EventEmitter();

  @Output()
  public buttonAction: EventEmitter<any> = new EventEmitter();

  public config: any;

  public eventHandler(e: any) {
    this.event.emit(e);
  }

  public buttonHandler(e: any) {
    this.buttonAction.emit(e);
  }
}
